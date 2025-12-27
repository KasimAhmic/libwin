#include "kernel32.hpp"

Napi::Value Kernel32::CreateActCtxW(const Napi::CallbackInfo &info) {
  const QB_ARG(pActCtx, qb::ReadRequiredObject(info, 0));

  const QB_ARG(cbSize, qb::ReadRequiredUint32(pActCtx, "cbSize"));
  const QB_ARG(dwFlags, qb::ReadOptionalUint32(pActCtx, "dwFlags"));
  const QB_ARG(lpSource, qb::ReadRequiredWideString(pActCtx, "lpSource"));
  const QB_ARG(wProcessorArchitecture, qb::ReadOptionalUint16(pActCtx, "wProcessorArchitecture"));
  const QB_ARG(wLangId, qb::ReadOptionalUint16(pActCtx, "wLangId"));
  const QB_ARG(lpAssemblyDirectory, qb::ReadOptionalWideString(pActCtx, "lpAssemblyDirectory"));
  const QB_ARG(lpResourceName, qb::ReadOptionalWideString(pActCtx, "lpResourceName"));
  const QB_ARG(lpApplicationName, qb::ReadOptionalWideString(pActCtx, "lpApplicationName"));
  const QB_ARG(hModule, qb::ReadOptionalUint64(pActCtx, "hModule"));

  ACTCTXW actctx{};

  actctx.cbSize = cbSize;
  actctx.lpSource = lpSource.c_str();
  QB_SET(actctx, dwFlags, dwFlags.value());
  QB_SET(actctx, wProcessorArchitecture, wProcessorArchitecture.value());
  QB_SET(actctx, wLangId, wLangId.value());
  QB_SET(actctx, lpAssemblyDirectory, lpAssemblyDirectory->c_str());
  QB_SET(actctx, lpResourceName, lpResourceName->c_str());
  QB_SET(actctx, lpApplicationName, lpApplicationName->c_str());
  QB_SET(actctx, hModule, reinterpret_cast<HMODULE>(hModule.value()));

  const HANDLE hActCtx = ::CreateActCtxW(&actctx);

  return qb::HandleToBigInt(info, hActCtx);
}

Napi::Value Kernel32::ActivateActCtx(const Napi::CallbackInfo &info) {
  const QB_ARG(hActCtx, qb::ReadRequiredUint64(info, 0));
  QB_ARG(lpCookie, qb::ReadRequiredUint64Buffer(info, 1));

  const BOOL result = ::ActivateActCtx(reinterpret_cast<HANDLE>(hActCtx), reinterpret_cast<ULONG_PTR *>(lpCookie));

  return Napi::Boolean::New(info.Env(), result);
}
