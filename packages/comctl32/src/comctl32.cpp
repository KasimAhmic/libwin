#include "comctl32.hpp"

Napi::Object Initialize(const Napi::Env env, Napi::Object exports) {
  QB_EXPORT(Comctl32::InitCommonControls);
  QB_EXPORT(Comctl32::InitCommonControlsEx);

  return exports;
}

NODE_API_MODULE(commctrl, Initialize)
