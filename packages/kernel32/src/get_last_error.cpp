#include "kernel32.hpp"

Napi::Value Kernel32::GetLastError(const Napi::CallbackInfo &info)
{
  const DWORD result = ::GetLastError();

  return Napi::Number::New(info.Env(), result);
}
