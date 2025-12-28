#include "kernel32.hpp"

Napi::Value Kernel32::GetCommandLineW(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const LPWSTR result = ::GetCommandLineW();
  const size_t len = wcslen(result);

  return Napi::String::New(env, reinterpret_cast<const char16_t *>(result), len);
}

Napi::Value Kernel32::GetCommandLineA(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const LPSTR result = ::GetCommandLineA();
  const size_t len = strlen(result);

  return Napi::String::New(env, reinterpret_cast<const char *>(result), len);
}
