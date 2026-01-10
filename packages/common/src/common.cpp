#include "common.hpp"

Napi::Object Initialize(Napi::Env env, Napi::Object exports) {
  QB_EXPORT(Common::ptr);

  return exports;
}

NODE_API_MODULE(common, Initialize)
