/**
 * QuickBind
 *
 * A header-only C++20 utility library for simplifying argument parsing and validation in Node.js native addons using
 * the Node-API (N-API) and the Napi C++ wrapper.
 *
 * Note: Might be worth looking into size checks for the integer types, particularly when going from (U)Int32 to
 * (U)Int16 or (U)Int8. Currently I just silently truncate the value, which aligns with how the Win32 API would handle
 * it, but extra validation and better errors to the developer might be useful. We'll see how I feel in a few months
 * when I inevitably have to debug some weird bug caused by this.
 *
 * Another note: Maybe it would be worth adding lower overhead functions that don't do any type checking or validation,
 * for functions that are called many times per second; e.x. GetMessageW, TranslateMessage, DispatchMessageW, etc.
 *
 * Copyright (c) 2025-present, Kasim Ahmic. (https://kasimahmic.com)
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

#pragma once

#include <charconv>
#include <concepts>
#include <cstdint>
#include <limits>
#include <optional>
#include <string>
#include <string_view>
#include <type_traits>

#include <minwindef.h>
#include <napi.h>

#define QB_THROW_IF_PENDING()                                                                                          \
  do {                                                                                                                 \
    if (info.Env().IsExceptionPending()) {                                                                             \
      return info.Env().Undefined();                                                                                   \
    }                                                                                                                  \
  } while (0);

#define QB_ARG(variable, expression)                                                                                   \
  auto variable = expression;                                                                                          \
  if (info.Env().IsExceptionPending()) {                                                                               \
    return info.Env().Undefined();                                                                                     \
  }

#define QB_SET(obj, optional, expression)                                                                              \
  do {                                                                                                                 \
    if (optional.has_value()) {                                                                                        \
      obj.optional = expression;                                                                                       \
    }                                                                                                                  \
  } while (0);

#define QB_EXPORT(function)                                                                                            \
  do {                                                                                                                 \
    constexpr std::string_view name = qb::detail::UnqualifiedName(#function);                                          \
    exports.Set(Napi::String::New(env, name.data(), name.size()),                                                      \
                Napi::Function::New(env, function, std::string(name)));                                                \
  } while (0);

#define QB_CHECK_NULLISH(value, required, prefix, location)                                                            \
  do {                                                                                                                 \
    if (value.IsNull() || value.IsUndefined()) {                                                                       \
      if (required) {                                                                                                  \
        qb::detail::ThrowTypeError(value.Env(), prefix, location);                                                     \
      }                                                                                                                \
      return std::nullopt;                                                                                             \
    }                                                                                                                  \
  } while (0);

/**
 * Static helper class for argument and property location descriptions in error messages.
 */
namespace qb {
  template <typename T, typename... U>
  concept IsAnyOf = (std::is_same_v<T, U> || ...);

  template <typename T>
  concept WinHandle = qb::IsAnyOf<T,
                                  HWND,
                                  HINSTANCE,
                                  HDC,
                                  HICON,
                                  HMENU,
                                  HBRUSH,
                                  HCURSOR,
                                  HBITMAP,
                                  HFONT,
                                  HMONITOR,
                                  HRGN,
                                  HPEN,
                                  HPALETTE,
                                  HCOLORSPACE,
                                  HACCEL,
                                  HGLRC,
                                  HDESK,
                                  HKL,
                                  HRAWINPUT,
                                  HRSRC,
                                  HLOCAL,
                                  HGLOBAL,
                                  HMODULE,
                                  HHOOK,
                                  HSZ,
                                  HMETAFILE,
                                  HENHMETAFILE,
                                  HKEY,
                                  HGDIOBJ>;

  template <typename T>
  concept WinString = qb::IsAnyOf<T, LPCSTR, LPSTR, const char *, char *>;

  template <typename T>
  concept WinWideString = qb::IsAnyOf<T, LPCWSTR, LPWSTR, const wchar_t *, wchar_t *>;

  namespace detail {
    consteval std::string_view UnqualifiedName(const std::string_view name) {
      const size_t pos = name.rfind("::");
      return pos == std::string_view::npos ? name : name.substr(pos + 2);
    }

    inline constexpr std::string_view EXPECTED_BIGINT = "Expected a BigInt ";
    inline constexpr std::string_view EXPECTED_NUMBER = "Expected a Number ";
    inline constexpr std::string_view EXPECTED_BIGINT_OR_NUMBER = "Expected a BigInt or Number ";
    inline constexpr std::string_view EXPECTED_STRING = "Expected a String ";
    inline constexpr std::string_view EXPECTED_BOOLEAN = "Expected a Boolean ";
    inline constexpr std::string_view EXPECTED_OBJECT = "Expected an Object ";
    inline constexpr std::string_view EXPECTED_FUNCTION = "Expected a Function ";
    inline constexpr std::string_view EXPECTED_INT8_ARRAY = "Expected an Int8Array ";
    inline constexpr std::string_view EXPECTED_INT16_ARRAY = "Expected an Int16Array ";
    inline constexpr std::string_view EXPECTED_INT32_ARRAY = "Expected an Int32Array ";
    inline constexpr std::string_view EXPECTED_INT64_ARRAY = "Expected a BigInt64Array ";
    inline constexpr std::string_view EXPECTED_UINT8_ARRAY = "Expected a Uint8Array ";
    inline constexpr std::string_view EXPECTED_UINT16_ARRAY = "Expected a Uint16Array ";
    inline constexpr std::string_view EXPECTED_UINT32_ARRAY = "Expected a Uint32Array ";
    inline constexpr std::string_view EXPECTED_UINT64_ARRAY = "Expected a BigUint64Array ";
    inline constexpr std::string_view BIGINT_TOO_LARGE = "BigInt is too large to fit in ";
    inline constexpr std::string_view AT_INDEX = "at index ";
    inline constexpr std::string_view FOR_PROPERTY = "for property ";

    struct Location {
      std::string in, where;
      Location(std::string_view in_, std::string_view where_) : in(in_), where(where_) {}
    };

    struct Argument : qb::detail::Location {
      explicit Argument(uint16_t index) : qb::detail::Location(AT_INDEX, std::to_string(index)) {}
    };

    struct Property : qb::detail::Location {
      explicit Property(std::string_view key) : qb::detail::Location(FOR_PROPERTY, key) {}
    };

    inline void ThrowTypeError(Napi::Env env, std::string_view prefix, const qb::detail::Location &location) {
      Napi::TypeError::New(env, std::string(prefix) + location.in + location.where).ThrowAsJavaScriptException();
    }

    [[nodiscard]] std::optional<uint64_t> inline ReadUint64(const Napi::Value &value,
                                                            const qb::detail::Location &location,
                                                            const bool required) {
      QB_CHECK_NULLISH(value, required, qb::detail::EXPECTED_BIGINT, location);

      if (!value.IsBigInt()) {
        qb::detail::ThrowTypeError(value.Env(), qb::detail::EXPECTED_BIGINT, location);
        return std::nullopt;
      }

      bool lossless = false;

      const uint64_t uint64Value = value.As<Napi::BigInt>().Uint64Value(&lossless);

      if (!lossless) {
        qb::detail::ThrowTypeError(value.Env(), qb::detail::BIGINT_TOO_LARGE, location);
        return std::nullopt;
      }

      return uint64Value;
    };

    [[nodiscard]] std::optional<uint32_t> inline ReadUint32(const Napi::Value &value,
                                                            const qb::detail::Location &location,
                                                            const bool required) {
      QB_CHECK_NULLISH(value, required, qb::detail::EXPECTED_NUMBER, location);

      if (!value.IsNumber()) {
        qb::detail::ThrowTypeError(value.Env(), qb::detail::EXPECTED_NUMBER, location);
        return std::nullopt;
      }

      const uint32_t uint32Value = value.As<Napi::Number>().Uint32Value();

      return uint32Value;
    };

    [[nodiscard]] std::optional<uint16_t> inline ReadUint16(const Napi::Value &value,
                                                            const qb::detail::Location &location,
                                                            const bool required) {
      QB_CHECK_NULLISH(value, required, qb::detail::EXPECTED_NUMBER, location);

      if (!value.IsNumber()) {
        qb::detail::ThrowTypeError(value.Env(), qb::detail::EXPECTED_NUMBER, location);
        return std::nullopt;
      }

      const uint16_t uint16Value = static_cast<uint16_t>(value.As<Napi::Number>().Uint32Value());

      return uint16Value;
    };

    [[nodiscard]] std::optional<uint8_t> inline ReadUint8(const Napi::Value &value,
                                                          const qb::detail::Location &location,
                                                          const bool required) {
      QB_CHECK_NULLISH(value, required, qb::detail::EXPECTED_NUMBER, location);

      if (!value.IsNumber()) {
        qb::detail::ThrowTypeError(value.Env(), qb::detail::EXPECTED_NUMBER, location);
        return std::nullopt;
      }

      const uint8_t uint8Value = static_cast<uint8_t>(value.As<Napi::Number>().Uint32Value());

      return uint8Value;
    };

    [[nodiscard]] std::optional<int64_t> inline ReadInt64(const Napi::Value &value,
                                                          const qb::detail::Location &location,
                                                          const bool required) {
      QB_CHECK_NULLISH(value, required, qb::detail::EXPECTED_BIGINT, location);

      if (!value.IsBigInt()) {
        qb::detail::ThrowTypeError(value.Env(), qb::detail::EXPECTED_BIGINT, location);
        return std::nullopt;
      }

      bool lossless = false;
      const int64_t int64Value = value.As<Napi::BigInt>().Int64Value(&lossless);

      if (!lossless) {
        qb::detail::ThrowTypeError(value.Env(), qb::detail::BIGINT_TOO_LARGE, location);
        return std::nullopt;
      }

      return int64Value;
    };

    [[nodiscard]] std::optional<int32_t> inline ReadInt32(const Napi::Value &value,
                                                          const qb::detail::Location &location,
                                                          const bool required) {
      QB_CHECK_NULLISH(value, required, qb::detail::EXPECTED_NUMBER, location);

      if (!value.IsNumber()) {
        qb::detail::ThrowTypeError(value.Env(), qb::detail::EXPECTED_NUMBER, location);
        return std::nullopt;
      }

      const int32_t int32Value = value.As<Napi::Number>().Int32Value();

      return int32Value;
    };

    [[nodiscard]] std::optional<int16_t> inline ReadInt16(const Napi::Value &value,
                                                          const qb::detail::Location &location,
                                                          const bool required) {
      QB_CHECK_NULLISH(value, required, qb::detail::EXPECTED_NUMBER, location);

      if (!value.IsNumber()) {
        qb::detail::ThrowTypeError(value.Env(), qb::detail::EXPECTED_NUMBER, location);
        return std::nullopt;
      }

      const int16_t int16Value = static_cast<int16_t>(value.As<Napi::Number>().Int32Value());

      return int16Value;
    };

    [[nodiscard]] std::optional<int8_t> inline ReadInt8(const Napi::Value &value,
                                                        const qb::detail::Location &location,
                                                        const bool required) {
      QB_CHECK_NULLISH(value, required, qb::detail::EXPECTED_NUMBER, location);

      if (!value.IsNumber()) {
        qb::detail::ThrowTypeError(value.Env(), qb::detail::EXPECTED_NUMBER, location);
        return std::nullopt;
      }

      const int8_t int8Value = static_cast<int8_t>(value.As<Napi::Number>().Int32Value());

      return int8Value;
    };

    [[nodiscard]] std::optional<std::string> inline ReadString(const Napi::Value &value,
                                                               const qb::detail::Location &location,
                                                               const bool required) {
      QB_CHECK_NULLISH(value, required, qb::detail::EXPECTED_STRING, location);

      if (!value.IsString()) {
        qb::detail::ThrowTypeError(value.Env(), qb::detail::EXPECTED_STRING, location);
        return std::nullopt;
      }

      const std::string stringValue = value.As<Napi::String>().Utf8Value();

      return stringValue;
    };

    [[nodiscard]] std::optional<std::wstring> inline ReadWideString(const Napi::Value &value,
                                                                    const qb::detail::Location &location,
                                                                    const bool required) {
      QB_CHECK_NULLISH(value, required, qb::detail::EXPECTED_STRING, location);

      if (!value.IsString()) {
        qb::detail::ThrowTypeError(value.Env(), qb::detail::EXPECTED_STRING, location);
        return std::nullopt;
      }

      const std::u16string stringValue = value.As<Napi::String>().Utf16Value();
      const std::wstring wideStringValue(stringValue.begin(), stringValue.end());

      return wideStringValue;
    };

    [[nodiscard]] std::optional<bool> inline ReadBoolean(const Napi::Value &value,
                                                         const qb::detail::Location &location,
                                                         const bool required) {
      QB_CHECK_NULLISH(value, required, qb::detail::EXPECTED_BOOLEAN, location);

      if (!value.IsBoolean()) {
        qb::detail::ThrowTypeError(value.Env(), qb::detail::EXPECTED_BOOLEAN, location);
        return std::nullopt;
      }

      return value.As<Napi::Boolean>().Value();
    };

    [[nodiscard]] std::optional<Napi::Object> inline ReadObject(const Napi::Value &value,
                                                                const qb::detail::Location &location,
                                                                const bool required) {
      QB_CHECK_NULLISH(value, required, qb::detail::EXPECTED_OBJECT, location);

      if (!value.IsObject()) {
        qb::detail::ThrowTypeError(value.Env(), qb::detail::EXPECTED_OBJECT, location);
        return std::nullopt;
      }

      const Napi::Object objectValue = value.As<Napi::Object>();

      return objectValue;
    }

    [[nodiscard]] std::optional<Napi::Function> inline ReadFunction(const Napi::Value &value,
                                                                    const qb::detail::Location &location,
                                                                    const bool required) {
      QB_CHECK_NULLISH(value, required, qb::detail::EXPECTED_FUNCTION, location);

      if (!value.IsFunction()) {
        qb::detail::ThrowTypeError(value.Env(), qb::detail::EXPECTED_FUNCTION, location);
        return std::nullopt;
      }

      const Napi::Function functionValue = value.As<Napi::Function>();

      return functionValue;
    };

    // TODO: Pretty sure this makes a copy of the data, which is not ideal for large buffers. Look into alternatives.

    template <typename IntType, typename NapiType, napi_typedarray_type... ArrayTypes>
    [[nodiscard]] inline std::optional<IntType *> ReadTypedArrayBuffer(const Napi::Value &value,
                                                                       const qb::detail::Location &location,
                                                                       const bool required,
                                                                       const std::string_view &errorMessage) {
      QB_CHECK_NULLISH(value, required, errorMessage, location);

      if (!value.IsTypedArray()) {
        qb::detail::ThrowTypeError(value.Env(), errorMessage, location);
        return std::nullopt;
      }

      const napi_typedarray_type type = value.As<Napi::TypedArray>().TypedArrayType();

      if (!((type == ArrayTypes) || ...)) {
        qb::detail::ThrowTypeError(value.Env(), errorMessage, location);
        return std::nullopt;
      }

      return std::optional(value.As<NapiType>().Data());
    }

    // TODO: Move this to a separate file, treat it like an extension to QuickBind for those on Windows.
    template <WinHandle T>
    [[nodiscard]] std::optional<T> inline ReadHandle(const Napi::Value &value,
                                                     const qb::detail::Location &location,
                                                     const bool required) {
      // QB_CHECK_NULLISH is done in ReadUint64
      const std::optional<uint64_t> handle = qb::detail::ReadUint64(value, location, required);

      if (!handle.has_value()) {
        return std::nullopt;
      }

      const T handleValue = reinterpret_cast<T>(static_cast<uintptr_t>(handle.value()));

      return handleValue;
    };

    [[nodiscard]] std::optional<uintptr_t> inline ReadPointerSized(const Napi::Value &value,
                                                                   const qb::detail::Location &location,
                                                                   const bool required) {
      QB_CHECK_NULLISH(value, required, qb::detail::EXPECTED_BIGINT_OR_NUMBER, location);

      if (value.IsBigInt()) {
        bool lossless = false;
        const uint64_t uint64Value = value.As<Napi::BigInt>().Uint64Value(&lossless);

        if (!lossless) {
          qb::detail::ThrowTypeError(value.Env(), qb::detail::BIGINT_TOO_LARGE, location);
          return std::nullopt;
        }

        return static_cast<uintptr_t>(uint64Value);
      }

      if (value.IsNumber()) {
        const uint32_t uint32Value = value.As<Napi::Number>().Uint32Value();

        return static_cast<uintptr_t>(uint32Value);
      }

      qb::detail::ThrowTypeError(value.Env(), qb::detail::EXPECTED_BIGINT_OR_NUMBER, location);

      return std::nullopt;
    };

  } // namespace detail

  /**** Unsigned 64-bit integers *************************************************************************************/

  [[nodiscard]] inline uint64_t ReadRequiredUint64(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadUint64(info[index], qb::detail::Argument(index), true).value_or(0);
  };

  [[nodiscard]] inline uint64_t ReadRequiredUint64(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadUint64(object.Get(key), qb::detail::Property(key), true).value_or(0);
  };

  [[nodiscard]] inline std::optional<uint64_t> ReadOptionalUint64(const Napi::CallbackInfo &info,
                                                                  const uint16_t index) {
    return qb::detail::ReadUint64(info[index], qb::detail::Argument(index), false);
  };

  [[nodiscard]] inline std::optional<uint64_t> ReadOptionalUint64(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadUint64(object.Get(key), qb::detail::Property(key), false);
  };

  /**** Unsigned 32-bit integers *************************************************************************************/

  [[nodiscard]] inline uint32_t ReadRequiredUint32(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadUint32(info[index], qb::detail::Argument(index), true).value_or(0);
  };

  [[nodiscard]] inline uint32_t ReadRequiredUint32(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadUint32(object.Get(key), qb::detail::Property(key), true).value_or(0);
  };

  [[nodiscard]] inline std::optional<uint32_t> ReadOptionalUint32(const Napi::CallbackInfo &info,
                                                                  const uint16_t index) {
    return qb::detail::ReadUint32(info[index], qb::detail::Argument(index), false);
  };

  [[nodiscard]] inline std::optional<uint32_t> ReadOptionalUint32(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadUint32(object.Get(key), qb::detail::Property(key), false);
  };

  /**** Unsigned 16-bit integers *************************************************************************************/

  [[nodiscard]] inline uint16_t ReadRequiredUint16(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadUint16(info[index], qb::detail::Argument(index), true).value_or(0);
  };

  [[nodiscard]] inline uint16_t ReadRequiredUint16(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadUint16(object.Get(key), qb::detail::Property(key), true).value_or(0);
  };

  [[nodiscard]] inline std::optional<uint16_t> ReadOptionalUint16(const Napi::CallbackInfo &info,
                                                                  const uint16_t index) {
    return qb::detail::ReadUint16(info[index], qb::detail::Argument(index), false);
  };

  [[nodiscard]] inline std::optional<uint16_t> ReadOptionalUint16(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadUint16(object.Get(key), qb::detail::Property(key), false);
  };

  /**** Unsigned 8-bit integers **************************************************************************************/

  [[nodiscard]] inline uint8_t ReadRequiredUint8(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadUint8(info[index], qb::detail::Argument(index), true).value_or(0);
  };

  [[nodiscard]] inline uint8_t ReadRequiredUint8(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadUint8(object.Get(key), qb::detail::Property(key), true).value_or(0);
  };

  [[nodiscard]] inline std::optional<uint8_t> ReadOptionalUint8(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadUint8(info[index], qb::detail::Argument(index), false);
  };

  [[nodiscard]] inline std::optional<uint8_t> ReadOptionalUint8(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadUint8(object.Get(key), qb::detail::Property(key), false);
  };

  /**** Signed 64-bit integers ***************************************************************************************/

  [[nodiscard]] inline int64_t ReadRequiredInt64(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadInt64(info[index], qb::detail::Argument(index), true).value_or(0);
  };

  [[nodiscard]] inline int64_t ReadRequiredInt64(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadInt64(object.Get(key), qb::detail::Property(key), true).value_or(0);
  };

  [[nodiscard]] inline std::optional<int64_t> ReadOptionalInt64(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadInt64(info[index], qb::detail::Argument(index), false);
  };

  [[nodiscard]] inline std::optional<int64_t> ReadOptionalInt64(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadInt64(object.Get(key), qb::detail::Property(key), false);
  };

  /**** Signed 32-bit integers ***************************************************************************************/

  [[nodiscard]] inline int32_t ReadRequiredInt32(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadInt32(info[index], qb::detail::Argument(index), true).value_or(0);
  };

  [[nodiscard]] inline int32_t ReadRequiredInt32(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadInt32(object.Get(key), qb::detail::Property(key), true).value_or(0);
  };

  [[nodiscard]] inline std::optional<int32_t> ReadOptionalInt32(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadInt32(info[index], qb::detail::Argument(index), false);
  };

  [[nodiscard]] inline std::optional<int32_t> ReadOptionalInt32(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadInt32(object.Get(key), qb::detail::Property(key), false);
  };

  /**** Signed 16-bit integers ***************************************************************************************/

  [[nodiscard]] inline int16_t ReadRequiredInt16(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadInt16(info[index], qb::detail::Argument(index), true).value_or(0);
  };

  [[nodiscard]] inline int16_t ReadRequiredInt16(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadInt16(object.Get(key), qb::detail::Property(key), true).value_or(0);
  };

  [[nodiscard]] inline std::optional<int16_t> ReadOptionalInt16(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadInt16(info[index], qb::detail::Argument(index), false);
  };

  [[nodiscard]] inline std::optional<int16_t> ReadOptionalInt16(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadInt16(object.Get(key), qb::detail::Property(key), false);
  };

  /**** Signed 8-bit integers ****************************************************************************************/

  [[nodiscard]] inline int8_t ReadRequiredInt8(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadInt8(info[index], qb::detail::Argument(index), true).value_or(0);
  };

  [[nodiscard]] inline int8_t ReadRequiredInt8(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadInt8(object.Get(key), qb::detail::Property(key), true).value_or(0);
  };

  [[nodiscard]] inline std::optional<int8_t> ReadOptionalInt8(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadInt8(info[index], qb::detail::Argument(index), false);
  };

  [[nodiscard]] inline std::optional<int8_t> ReadOptionalInt8(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadInt8(object.Get(key), qb::detail::Property(key), false);
  };

  /**** Strings ******************************************************************************************************/

  [[nodiscard]] inline std::string ReadRequiredString(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadString(info[index], qb::detail::Argument(index), true).value_or("");
  };

  [[nodiscard]] inline std::string ReadRequiredString(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadString(object.Get(key), qb::detail::Property(key), true).value_or("");
  };

  [[nodiscard]] inline std::optional<std::string> ReadOptionalString(const Napi::CallbackInfo &info,
                                                                     const uint16_t index) {
    return qb::detail::ReadString(info[index], qb::detail::Argument(index), false);
  };

  [[nodiscard]] inline std::optional<std::string> ReadOptionalString(const Napi::Object &object,
                                                                     const std::string &key) {
    return qb::detail::ReadString(object.Get(key), qb::detail::Property(key), false);
  };

  /**** Wide strings *************************************************************************************************/

  [[nodiscard]] inline std::wstring ReadRequiredWideString(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadWideString(info[index], qb::detail::Argument(index), true).value_or(L"");
  };

  [[nodiscard]] inline std::wstring ReadRequiredWideString(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadWideString(object.Get(key), qb::detail::Property(key), true).value_or(L"");
  };

  [[nodiscard]] inline std::optional<std::wstring> ReadOptionalWideString(const Napi::CallbackInfo &info,
                                                                          const uint16_t index) {
    return qb::detail::ReadWideString(info[index], qb::detail::Argument(index), false);
  };

  [[nodiscard]] inline std::optional<std::wstring> ReadOptionalWideString(const Napi::Object &object,
                                                                          const std::string &key) {
    return qb::detail::ReadWideString(object.Get(key), qb::detail::Property(key), false);
  };

  /**** Booleans *****************************************************************************************************/

  [[nodiscard]] inline bool ReadRequiredBoolean(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadBoolean(info[index], qb::detail::Argument(index), true).value_or(false);
  };

  [[nodiscard]] inline bool ReadRequiredBoolean(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadBoolean(object.Get(key), qb::detail::Property(key), true).value_or(false);
  };

  [[nodiscard]] inline std::optional<bool> ReadOptionalBoolean(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadBoolean(info[index], qb::detail::Argument(index), false);
  };

  [[nodiscard]] inline std::optional<bool> ReadOptionalBoolean(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadBoolean(object.Get(key), qb::detail::Property(key), false);
  };

  /**** Objects ******************************************************************************************************/

  [[nodiscard]] inline Napi::Object ReadRequiredObject(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadObject(info[index], qb::detail::Argument(index), true).value_or({});
  };

  [[nodiscard]] inline Napi::Object ReadRequiredObject(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadObject(object.Get(key), qb::detail::Property(key), true).value_or({});
  };

  [[nodiscard]] inline std::optional<Napi::Object> ReadOptionalObject(const Napi::CallbackInfo &info,
                                                                      const uint16_t index) {
    return qb::detail::ReadObject(info[index], qb::detail::Argument(index), false);
  };

  [[nodiscard]] inline std::optional<Napi::Object> ReadOptionalObject(const Napi::Object &object,
                                                                      const std::string &key) {
    return qb::detail::ReadObject(object.Get(key), qb::detail::Property(key), false);
  };

  /**** Functions ****************************************************************************************************/

  [[nodiscard]] inline Napi::Function ReadRequiredFunction(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadFunction(info[index], qb::detail::Argument(index), true).value_or({});
  };

  [[nodiscard]] inline Napi::Function ReadRequiredFunction(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadFunction(object.Get(key), qb::detail::Property(key), true).value_or({});
  };

  [[nodiscard]] inline std::optional<Napi::Function> ReadOptionalFunction(const Napi::CallbackInfo &info,
                                                                          const uint16_t index) {
    return qb::detail::ReadFunction(info[index], qb::detail::Argument(index), false);
  };

  [[nodiscard]] inline std::optional<Napi::Function> ReadOptionalFunction(const Napi::Object &object,
                                                                          const std::string &key) {
    return qb::detail::ReadFunction(object.Get(key), qb::detail::Property(key), false);
  };

  /**** Handles ******************************************************************************************************/

  template <qb::WinHandle T>
  [[nodiscard]] inline T ReadRequiredHandle(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadHandle<T>(info[index], qb::detail::Argument(index), true).value_or({});
  };

  template <qb::WinHandle T>
  [[nodiscard]] inline T ReadRequiredHandle(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadHandle<T>(object.Get(key), qb::detail::Property(key), true).value_or({});
  };

  template <qb::WinHandle T>
  [[nodiscard]] inline std::optional<T> ReadOptionalHandle(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadHandle<T>(info[index], qb::detail::Argument(index), false);
  };

  template <qb::WinHandle T>
  [[nodiscard]] inline std::optional<T> ReadOptionalHandle(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadHandle<T>(object.Get(key), qb::detail::Property(key), false);
  };

  /**** Handles that can also be resources IDs ***********************************************************************/

  [[nodiscard]] inline uintptr_t ReadRequiredPointerSized(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadPointerSized(info[index], qb::detail::Argument(index), true).value_or({});
  };

  [[nodiscard]] inline uintptr_t ReadRequiredPointerSized(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadPointerSized(object.Get(key), qb::detail::Property(key), true).value_or({});
  };

  [[nodiscard]] inline std::optional<uintptr_t> ReadOptionalPointerSized(const Napi::CallbackInfo &info,
                                                                         const uint16_t index) {
    return qb::detail::ReadPointerSized(info[index], qb::detail::Argument(index), false);
  };

  [[nodiscard]] inline std::optional<uintptr_t> ReadOptionalPointerSized(const Napi::Object &object,
                                                                         const std::string &key) {
    return qb::detail::ReadPointerSized(object.Get(key), qb::detail::Property(key), false);
  };

  /**** Signed 8-bit buffers *****************************************************************************************/

  [[nodiscard]] inline int8_t *ReadRequiredInt8Buffer(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadTypedArrayBuffer<int8_t, Napi::Int8Array, napi_int8_array>(info[index],
                                                                                      qb::detail::Argument(index),
                                                                                      true,
                                                                                      qb::detail::EXPECTED_INT8_ARRAY)
        .value_or({});
  }

  [[nodiscard]] inline int8_t *ReadRequiredInt8Buffer(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadTypedArrayBuffer<int8_t, Napi::Int8Array, napi_int8_array>(object.Get(key),
                                                                                      qb::detail::Property(key),
                                                                                      true,
                                                                                      qb::detail::EXPECTED_INT8_ARRAY)
        .value_or({});
  }

  [[nodiscard]] inline std::optional<int8_t *> ReadOptionalInt8Buffer(const Napi::CallbackInfo &info,
                                                                      const uint16_t index) {
    return qb::detail::ReadTypedArrayBuffer<int8_t, Napi::Int8Array, napi_int8_array>(info[index],
                                                                                      qb::detail::Argument(index),
                                                                                      false,
                                                                                      qb::detail::EXPECTED_INT8_ARRAY);
  }

  [[nodiscard]] inline std::optional<int8_t *> ReadOptionalInt8Buffer(const Napi::Object &object,
                                                                      const std::string &key) {
    return qb::detail::ReadTypedArrayBuffer<int8_t, Napi::Int8Array, napi_int8_array>(object.Get(key),
                                                                                      qb::detail::Property(key),
                                                                                      false,
                                                                                      qb::detail::EXPECTED_INT8_ARRAY);
  }

  /**** Signed 16-bit buffers ****************************************************************************************/

  [[nodiscard]] inline int16_t *ReadRequiredInt16Buffer(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadTypedArrayBuffer<int16_t, Napi::Int16Array, napi_int16_array>(
               info[index],
               qb::detail::Argument(index),
               true,
               qb::detail::EXPECTED_INT16_ARRAY)
        .value_or({});
  }

  [[nodiscard]] inline int16_t *ReadRequiredInt16Buffer(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadTypedArrayBuffer<int16_t, Napi::Int16Array, napi_int16_array>(
               object.Get(key),
               qb::detail::Property(key),
               true,
               qb::detail::EXPECTED_INT16_ARRAY)
        .value_or({});
  }

  [[nodiscard]] inline std::optional<int16_t *> ReadOptionalInt16Buffer(const Napi::CallbackInfo &info,
                                                                        const uint16_t index) {
    return qb::detail::ReadTypedArrayBuffer<int16_t, Napi::Int16Array, napi_int16_array>(
        info[index],
        qb::detail::Argument(index),
        false,
        qb::detail::EXPECTED_INT16_ARRAY);
  }

  [[nodiscard]] inline std::optional<int16_t *> ReadOptionalInt16Buffer(const Napi::Object &object,
                                                                        const std::string &key) {
    return qb::detail::ReadTypedArrayBuffer<int16_t, Napi::Int16Array, napi_int16_array>(
        object.Get(key),
        qb::detail::Property(key),
        false,
        qb::detail::EXPECTED_INT16_ARRAY);
  }

  /**** Signed 32-bit buffers ****************************************************************************************/

  [[nodiscard]] inline int32_t *ReadRequiredInt32Buffer(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadTypedArrayBuffer<int32_t, Napi::Int32Array, napi_int32_array>(
               info[index],
               qb::detail::Argument(index),
               true,
               qb::detail::EXPECTED_INT32_ARRAY)
        .value_or({});
  }

  [[nodiscard]] inline int32_t *ReadRequiredInt32Buffer(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadTypedArrayBuffer<int32_t, Napi::Int32Array, napi_int32_array>(
               object.Get(key),
               qb::detail::Property(key),
               true,
               qb::detail::EXPECTED_INT32_ARRAY)
        .value_or({});
  }

  [[nodiscard]] inline std::optional<int32_t *> ReadOptionalInt32Buffer(const Napi::CallbackInfo &info,
                                                                        const uint16_t index) {
    return qb::detail::ReadTypedArrayBuffer<int32_t, Napi::Int32Array, napi_int32_array>(
        info[index],
        qb::detail::Argument(index),
        false,
        qb::detail::EXPECTED_INT32_ARRAY);
  }

  [[nodiscard]] inline std::optional<int32_t *> ReadOptionalInt32Buffer(const Napi::Object &object,
                                                                        const std::string &key) {
    return qb::detail::ReadTypedArrayBuffer<int32_t, Napi::Int32Array, napi_int32_array>(
        object.Get(key),
        qb::detail::Property(key),
        false,
        qb::detail::EXPECTED_INT32_ARRAY);
  }

  /**** Signed 64-bit buffers ****************************************************************************************/

  [[nodiscard]] inline int64_t *ReadRequiredInt64Buffer(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadTypedArrayBuffer<int64_t, Napi::BigInt64Array, napi_bigint64_array>(
               info[index],
               qb::detail::Argument(index),
               true,
               qb::detail::EXPECTED_INT64_ARRAY)
        .value_or({});
  }

  [[nodiscard]] inline int64_t *ReadRequiredInt64Buffer(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadTypedArrayBuffer<int64_t, Napi::BigInt64Array, napi_bigint64_array>(
               object.Get(key),
               qb::detail::Property(key),
               true,
               qb::detail::EXPECTED_INT64_ARRAY)
        .value_or({});
  }

  [[nodiscard]] inline std::optional<int64_t *> ReadOptionalInt64Buffer(const Napi::CallbackInfo &info,
                                                                        const uint16_t index) {
    return qb::detail::ReadTypedArrayBuffer<int64_t, Napi::BigInt64Array, napi_bigint64_array>(
        info[index],
        qb::detail::Argument(index),
        false,
        qb::detail::EXPECTED_INT64_ARRAY);
  }

  [[nodiscard]] inline std::optional<int64_t *> ReadOptionalInt64Buffer(const Napi::Object &object,
                                                                        const std::string &key) {
    return qb::detail::ReadTypedArrayBuffer<int64_t, Napi::BigInt64Array, napi_bigint64_array>(
        object.Get(key),
        qb::detail::Property(key),
        false,
        qb::detail::EXPECTED_INT64_ARRAY);
  }

  /**** Unsigned 8-bit buffers ***************************************************************************************/

  [[nodiscard]] inline uint8_t *ReadRequiredUint8Buffer(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadTypedArrayBuffer<uint8_t, Napi::Uint8Array, napi_uint8_array, napi_uint8_clamped_array>(
               info[index],
               qb::detail::Argument(index),
               true,
               qb::detail::EXPECTED_UINT8_ARRAY)
        .value_or({});
  }

  [[nodiscard]] inline uint8_t *ReadRequiredUint8Buffer(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadTypedArrayBuffer<uint8_t, Napi::Uint8Array, napi_uint8_array, napi_uint8_clamped_array>(
               object.Get(key),
               qb::detail::Property(key),
               true,
               qb::detail::EXPECTED_UINT8_ARRAY)
        .value_or({});
  }

  [[nodiscard]] inline std::optional<uint8_t *> ReadOptionalUint8Buffer(const Napi::CallbackInfo &info,
                                                                        const uint16_t index) {
    return qb::detail::ReadTypedArrayBuffer<uint8_t, Napi::Uint8Array, napi_uint8_array, napi_uint8_clamped_array>(
        info[index],
        qb::detail::Argument(index),
        false,
        qb::detail::EXPECTED_UINT8_ARRAY);
  }

  [[nodiscard]] inline std::optional<uint8_t *> ReadOptionalUint8Buffer(const Napi::Object &object,
                                                                        const std::string &key) {
    return qb::detail::ReadTypedArrayBuffer<uint8_t, Napi::Uint8Array, napi_uint8_array, napi_uint8_clamped_array>(
        object.Get(key),
        qb::detail::Property(key),
        false,
        qb::detail::EXPECTED_UINT8_ARRAY);
  }

  /**** Unsigned 16-bit buffers **************************************************************************************/

  [[nodiscard]] inline uint16_t *ReadRequiredUint16Buffer(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadTypedArrayBuffer<uint16_t, Napi::Uint16Array, napi_uint16_array>(
               info[index],
               qb::detail::Argument(index),
               true,
               qb::detail::EXPECTED_UINT16_ARRAY)
        .value_or({});
  }

  [[nodiscard]] inline uint16_t *ReadRequiredUint16Buffer(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadTypedArrayBuffer<uint16_t, Napi::Uint16Array, napi_uint16_array>(
               object.Get(key),
               qb::detail::Property(key),
               true,
               qb::detail::EXPECTED_UINT16_ARRAY)
        .value_or({});
  }

  [[nodiscard]] inline std::optional<uint16_t *> ReadOptionalUint16Buffer(const Napi::CallbackInfo &info,
                                                                          const uint16_t index) {
    return qb::detail::ReadTypedArrayBuffer<uint16_t, Napi::Uint16Array, napi_uint16_array>(
        info[index],
        qb::detail::Argument(index),
        false,
        qb::detail::EXPECTED_UINT16_ARRAY);
  }

  [[nodiscard]] inline std::optional<uint16_t *> ReadOptionalUint16Buffer(const Napi::Object &object,
                                                                          const std::string &key) {
    return qb::detail::ReadTypedArrayBuffer<uint16_t, Napi::Uint16Array, napi_uint16_array>(
        object.Get(key),
        qb::detail::Property(key),
        false,
        qb::detail::EXPECTED_UINT16_ARRAY);
  }

  /**** Unsigned 32-bit buffers **************************************************************************************/

  [[nodiscard]] inline uint32_t *ReadRequiredUint32Buffer(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadTypedArrayBuffer<uint32_t, Napi::Uint32Array, napi_uint32_array>(
               info[index],
               qb::detail::Argument(index),
               true,
               qb::detail::EXPECTED_UINT32_ARRAY)
        .value_or({});
  }

  [[nodiscard]] inline uint32_t *ReadRequiredUint32Buffer(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadTypedArrayBuffer<uint32_t, Napi::Uint32Array, napi_uint32_array>(
               object.Get(key),
               qb::detail::Property(key),
               true,
               qb::detail::EXPECTED_UINT32_ARRAY)
        .value_or({});
  }

  [[nodiscard]] inline std::optional<uint32_t *> ReadOptionalUint32Buffer(const Napi::CallbackInfo &info,
                                                                          const uint16_t index) {
    return qb::detail::ReadTypedArrayBuffer<uint32_t, Napi::Uint32Array, napi_uint32_array>(
        info[index],
        qb::detail::Argument(index),
        false,
        qb::detail::EXPECTED_UINT32_ARRAY);
  }

  [[nodiscard]] inline std::optional<uint32_t *> ReadOptionalUint32Buffer(const Napi::Object &object,
                                                                          const std::string &key) {
    return qb::detail::ReadTypedArrayBuffer<uint32_t, Napi::Uint32Array, napi_uint32_array>(
        object.Get(key),
        qb::detail::Property(key),
        false,
        qb::detail::EXPECTED_UINT32_ARRAY);
  }

  /**** Unsigned 64-bit buffers **************************************************************************************/

  [[nodiscard]] inline uint64_t *ReadRequiredUint64Buffer(const Napi::CallbackInfo &info, const uint16_t index) {
    return qb::detail::ReadTypedArrayBuffer<uint64_t, Napi::BigUint64Array, napi_biguint64_array>(
               info[index],
               qb::detail::Argument(index),
               true,
               qb::detail::EXPECTED_UINT64_ARRAY)
        .value_or({});
  }

  [[nodiscard]] inline uint64_t *ReadRequiredUint64Buffer(const Napi::Object &object, const std::string &key) {
    return qb::detail::ReadTypedArrayBuffer<uint64_t, Napi::BigUint64Array, napi_biguint64_array>(
               object.Get(key),
               qb::detail::Property(key),
               true,
               qb::detail::EXPECTED_UINT64_ARRAY)
        .value_or({});
  }

  [[nodiscard]] inline std::optional<uint64_t *> ReadOptionalUint64Buffer(const Napi::CallbackInfo &info,
                                                                          const uint16_t index) {
    return qb::detail::ReadTypedArrayBuffer<uint64_t, Napi::BigUint64Array, napi_biguint64_array>(
        info[index],
        qb::detail::Argument(index),
        false,
        qb::detail::EXPECTED_UINT64_ARRAY);
  }

  [[nodiscard]] inline std::optional<uint64_t *> ReadOptionalUint64Buffer(const Napi::Object &object,
                                                                          const std::string &key) {
    return qb::detail::ReadTypedArrayBuffer<uint64_t, Napi::BigUint64Array, napi_biguint64_array>(
        object.Get(key),
        qb::detail::Property(key),
        false,
        qb::detail::EXPECTED_UINT64_ARRAY);
  }

  /**** Convertors ***************************************************************************************************/

  template <qb::WinHandle T> inline Napi::BigInt HandleToBigInt(const Napi::CallbackInfo &info, const T &value) {
    return Napi::BigInt::New(info.Env(), reinterpret_cast<uintptr_t>(value));
  }

  template <qb::WinString T> inline Napi::String StringToString(const Napi::CallbackInfo &info, const T &value) {
    if (!value) {
      return Napi::String::New(info.Env(), "");
    }

    const size_t len = strlen(value);
    return Napi::String::New(info.Env(), value, len);
  }

  template <qb::WinWideString T> inline Napi::String StringToString(const Napi::CallbackInfo &info, const T &value) {
    if (!value) {
      return Napi::String::New(info.Env(), "");
    }

    const size_t len = wcslen(value);
    return Napi::String::New(info.Env(), reinterpret_cast<const char16_t *>(value), len);
  }
}; // namespace qb

#undef QB_CHECK_NULLISH
