#include "kernel32.hpp"

Napi::Value Kernel32::GetStartupInfoW(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const QB_ARG(lpStartupInfo, qb::ReadRequiredObject(info, 0));

  const QB_ARG(cb, qb::ReadRequiredUint32(lpStartupInfo, "cb"));

  STARTUPINFOW lpsi{};
  lpsi.cb = cb;

  ::GetStartupInfoW(&lpsi);

  Napi::Object result = Napi::Object::New(env);

  lpStartupInfo.Set("cb", static_cast<uint32_t>(lpsi.cb));
  lpStartupInfo.Set("lpReserved", qb::StringToString(info, lpsi.lpReserved));
  lpStartupInfo.Set("lpDesktop", qb::StringToString(info, lpsi.lpDesktop));
  lpStartupInfo.Set("lpTitle", qb::StringToString(info, lpsi.lpTitle));
  lpStartupInfo.Set("dwX", static_cast<uint32_t>(lpsi.dwX));
  lpStartupInfo.Set("dwY", static_cast<uint32_t>(lpsi.dwY));
  lpStartupInfo.Set("dwXSize", static_cast<uint32_t>(lpsi.dwXSize));
  lpStartupInfo.Set("dwYSize", static_cast<uint32_t>(lpsi.dwYSize));
  lpStartupInfo.Set("dwXCountChars", static_cast<uint32_t>(lpsi.dwXCountChars));
  lpStartupInfo.Set("dwYCountChars", static_cast<uint32_t>(lpsi.dwYCountChars));
  lpStartupInfo.Set("dwFillAttribute", static_cast<uint32_t>(lpsi.dwFillAttribute));
  lpStartupInfo.Set("dwFlags", static_cast<uint32_t>(lpsi.dwFlags));
  lpStartupInfo.Set("wShowWindow", static_cast<uint16_t>(lpsi.wShowWindow));
  lpStartupInfo.Set("cbReserved2", static_cast<uint16_t>(lpsi.cbReserved2));
  // lpStartupInfo.Set("lpReserved2", lpsi.lpReserved2);
  lpStartupInfo.Set("hStdInput", qb::HandleToBigInt(info, lpsi.hStdInput));
  lpStartupInfo.Set("hStdOutput", qb::HandleToBigInt(info, lpsi.hStdOutput));
  lpStartupInfo.Set("hStdError", qb::HandleToBigInt(info, lpsi.hStdError));

  return env.Undefined();
}
