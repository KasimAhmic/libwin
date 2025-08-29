#pragma once

#include <napi.h>
#include <windows.h>

#include "common.hpp"

template <WinHandle T>
T ReadArgAsHandle(const Napi::CallbackInfo &info, const uint16_t index)
{
  const Napi::Value value = info[index];

  if (!value.IsBigInt())
  {
    Napi::TypeError::New(info.Env(), "Expected a BigInt at index " + ToString(index)).ThrowAsJavaScriptException();
    return T{};
  }

  bool lossless;
  const auto bigIntValue = value.As<Napi::BigInt>().Uint64Value(&lossless);

  if (!lossless)
  {
    Napi::TypeError::New(info.Env(), "BigInt at index " + ToString(index) + " is too large to fit in a pointer").ThrowAsJavaScriptException();
    return T{};
  }

  return reinterpret_cast<T>(bigIntValue);
}

inline UINT ReadArgAsUINT(const Napi::CallbackInfo &info, const uint16_t index)
{
  const Napi::Value value = info[index];

  if (!value.IsNumber())
  {
    Napi::TypeError::New(info.Env(), "Expected a Number at index " + ToString(index)).ThrowAsJavaScriptException();
    return 0;
  }

  return value.As<Napi::Number>().Uint32Value();
}

inline uint16_t ReadArgAsWORD(const Napi::CallbackInfo &info, const uint16_t index)
{
  const Napi::Value value = info[index];

  if (!value.IsNumber())
  {
    Napi::TypeError::New(info.Env(), "Expected a Number at index " + ToString(index)).ThrowAsJavaScriptException();
    return 0;
  }

  return static_cast<WORD>(value.As<Napi::Number>().Uint32Value());
}

inline std::wstring ReadArgAsWideString(const Napi::CallbackInfo &info, const uint16_t index)
{
  const Napi::Value value = info[index];

  if (!value.IsString())
  {
    Napi::TypeError::New(info.Env(), "Expected a String at index " + ToString(index)).ThrowAsJavaScriptException();
    return {};
  }

  const std::u16string strValue = value.As<Napi::String>().Utf16Value();

  return {strValue.begin(), strValue.end()};
}

inline std::string ReadArgAsString(const Napi::CallbackInfo &info, const uint16_t index)
{
  const Napi::Value value = info[index];

  if (!value.IsString())
  {
    Napi::TypeError::New(info.Env(), "Expected a String at index " + ToString(index)).ThrowAsJavaScriptException();
    return {};
  }

  return value.As<Napi::String>().Utf8Value();
}

inline Napi::Object ReadArgAsObject(const Napi::CallbackInfo &info, const uint16_t index)
{
  const Napi::Value value = info[index];

  if (!value.IsObject())
  {
    Napi::TypeError::New(info.Env(), "Expected an Object at index " + ToString(index)).ThrowAsJavaScriptException();
    return Napi::Object::New(info.Env());
  }

  return value.As<Napi::Object>();
}
