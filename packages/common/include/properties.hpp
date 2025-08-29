#pragma once

#include <optional>

#include <napi.h>
#include <windows.h>

#include "common.hpp"

inline std::optional<uint32_t> ReadPropertyAsUint32(const Napi::Object &obj, const char *key, const bool nullable = false)
{
  const Napi::Value value = obj.Get(key);

  if ((!nullable && IsNullish(value)) || !value.IsNumber())
  {
    Napi::TypeError::New(obj.Env(), "Expected a Number for property " + std::string(key)).ThrowAsJavaScriptException();
    return std::nullopt;
  }

  return value.As<Napi::Number>().Uint32Value();
}

inline std::optional<uint64_t> ReadPropertyAsUint64(const Napi::Object &obj, const char *key, const bool nullable = false)
{
  const Napi::Value value = obj.Get(key);

  if ((!nullable && IsNullish(value)) || !value.IsBigInt())
  {
    Napi::TypeError::New(obj.Env(), "Expected a BigInt for property " + std::string(key)).ThrowAsJavaScriptException();
    return std::nullopt;
  }

  bool lossless;
  const auto bigIntValue = value.As<Napi::BigInt>().Uint64Value(&lossless);

  if (!lossless)
  {
    Napi::TypeError::New(obj.Env(), "BigInt for property " + std::string(key) + " is too large to fit in a uint64_t").ThrowAsJavaScriptException();
    return std::nullopt;
  }

  return bigIntValue;
}

inline std::optional<std::wstring> ReadPropertyAsWideString(const Napi::Object &obj, const char *key, const bool nullable = false)
{
  const Napi::Value value = obj.Get(key);

  if ((!nullable && IsNullish(value)) || !value.IsString())
  {
    Napi::TypeError::New(obj.Env(), "Expected a String for property " + std::string(key)).ThrowAsJavaScriptException();
    return std::nullopt;
  }

  const std::u16string strValue = value.As<Napi::String>().Utf16Value();

  return std::wstring(strValue.begin(), strValue.end());
}

inline std::optional<std::string> ReadPropertyAsString(const Napi::Object &obj, const char *key, const bool nullable = false)
{
  const Napi::Value value = obj.Get(key);

  if ((!nullable && IsNullish(value)) || !value.IsString())
  {
    Napi::TypeError::New(obj.Env(), "Expected a String for property " + std::string(key)).ThrowAsJavaScriptException();
    return std::nullopt;
  }

  return value.As<Napi::String>().Utf8Value();
}

inline std::optional<Napi::Function> ReadPropertyAsFunction(const Napi::Object &obj, const char *key, const bool nullable = false)
{
  const Napi::Value value = obj.Get(key);

  if ((!nullable && IsNullish(value)) || !value.IsFunction())
  {
    Napi::TypeError::New(obj.Env(), "Expected a Function for property " + std::string(key)).ThrowAsJavaScriptException();
    return std::nullopt;
  }

  return value.As<Napi::Function>();
}
