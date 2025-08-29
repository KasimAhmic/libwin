#pragma once

#include <string>
#include <charconv>
#include <type_traits>
#include <limits>

#include <napi.h>
#include <windows.h>

template <typename T, typename... U>
concept IsAnyOf = (std::is_same_v<T, U> || ...);

template <typename T>
concept WinHandle = IsAnyOf<T, HWND, HINSTANCE, HDC, HICON, HMENU, HBRUSH, HCURSOR, HBITMAP, HFONT, HMONITOR,
                            HRGN, HPEN, HPALETTE, HCOLORSPACE, HACCEL, HGLRC, HDESK, HKL, HRAWINPUT, HRSRC,
                            HLOCAL, HGLOBAL, HMODULE, HHOOK, HSZ, HMETAFILE, HENHMETAFILE, HKEY, HGDIOBJ>;

/**
 * @brief Converts a numeric value to its string representation using only as much space as needed.
 */
template <typename T>
std::string ToString(T value)
{
  struct _impl
  {
    static consteval std::size_t bytes()
    {
      using U = std::make_unsigned_t<T>;
      U v = std::numeric_limits<U>::max();
      std::size_t digits = 0;

      do
      {
        v /= 10;
        ++digits;
      } while (v != 0);

      if constexpr (std::is_signed_v<T>)
      {
        ++digits;
      }

      return digits;
    }
  };

  constexpr std::size_t bufferSize = _impl::bytes();
  char buf[bufferSize];

  auto [ptr, ec] = std::to_chars(buf, buf + bufferSize, value);
  return std::string(buf, static_cast<std::size_t>(ptr - buf));
}

template <WinHandle T>
inline Napi::BigInt HandleToBigInt(const Napi::CallbackInfo &info, const T &value)
{
  return Napi::BigInt::New(info.Env(), reinterpret_cast<uintptr_t>(value));
}

inline bool IsNullish(const Napi::Value &value)
{
  return value.IsNull() || value.IsUndefined();
}
