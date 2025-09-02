#include "kernel32.hpp"

Napi::Object Initialize(const Napi::Env env, Napi::Object exports) {
  QB_EXPORT(Kernel32::GetLastError);
  QB_EXPORT(Kernel32::GetModuleHandleW);

  return exports;
}

NODE_API_MODULE(kernel32, Initialize)
