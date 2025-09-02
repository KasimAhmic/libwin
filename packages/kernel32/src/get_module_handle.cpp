#include "kernel32.hpp"

Napi::Value Kernel32::GetModuleHandleW(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const QB_ARG(lpModuleName, qb::ReadOptionalWideString(info, 0));

  const HMODULE hModule = ::GetModuleHandleW(lpModuleName ? lpModuleName->c_str() : nullptr);

  return qb::HandleToBigInt(info, hModule);
}
