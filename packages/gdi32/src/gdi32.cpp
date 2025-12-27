#include "gdi32.hpp"

Napi::Object Initialize(const Napi::Env env, Napi::Object exports) {
  QB_EXPORT(Gdi32::CreateFontW);
  QB_EXPORT(Gdi32::CreateFontA);

  return exports;
}

NODE_API_MODULE(gdi32, Initialize)
