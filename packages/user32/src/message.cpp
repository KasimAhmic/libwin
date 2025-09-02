#include "user32.hpp"

Napi::Value User32::PostQuitMessage(const Napi::CallbackInfo &info) {
  const QB_ARG(nExitCode, qb::ReadRequiredInt32(info, 0));

  ::PostQuitMessage(nExitCode);

  return info.Env().Undefined();
}
