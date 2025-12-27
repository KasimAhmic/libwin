#include "comctl32.hpp"

Napi::Value Comctl32::InitCommonControls(const Napi::CallbackInfo &info) {
  ::InitCommonControls();

  return info.Env().Undefined();
}

Napi::Value Comctl32::InitCommonControlsEx(const Napi::CallbackInfo &info) {
  const QB_ARG(init, qb::ReadRequiredObject(info, 0));

  const QB_ARG(dwSize, qb::ReadRequiredUint32(init, "dwSize"));
  const QB_ARG(dwICC, qb::ReadRequiredUint32(init, "dwICC"));

  const INITCOMMONCONTROLSEX iccex{dwSize, dwICC};

  const BOOL result = ::InitCommonControlsEx(&iccex);

  return Napi::Boolean::New(info.Env(), result);
}
