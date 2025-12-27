#include "kernel32.hpp"

// TODO: Gotta figure out how to handle multi-type parameters. lpSource could either be a string or a handle.
// TODO: Figure out how to handle the va_list parameter (Arguments).
// TODO: Figure out how to handle when FORMAT_MESSAGE_ALLOCATE_BUFFER is set
Napi::Value Kernel32::FormatMessageW(const Napi::CallbackInfo &info) {
  const QB_ARG(dwFlags, qb::ReadRequiredUint32(info, 0));
  const QB_ARG(lpSource, qb::ReadOptionalWideString(info, 1));
  const QB_ARG(dwMessageId, qb::ReadRequiredUint32(info, 2));
  const QB_ARG(dwLanguageId, qb::ReadRequiredUint32(info, 3));
  QB_ARG(lpBuffer, qb::ReadRequiredUint16Buffer(info, 4));
  const QB_ARG(nSize, qb::ReadRequiredUint32(info, 5));
  // const QB_ARG(Arguments, qb::ReadOptionalHandle<void>(info, 5)); ??

  const DWORD result = ::FormatMessageW(dwFlags,
                                        lpSource ? lpSource->c_str() : nullptr,
                                        dwMessageId,
                                        dwLanguageId,
                                        // TODO: Pretty sure I don't want to be doing this...
                                        reinterpret_cast<LPWSTR>(lpBuffer),
                                        nSize,
                                        nullptr);

  return Napi::Number::New(info.Env(), result);
}

// TODO: Gotta figure out how to handle multi-type parameters. lpSource could either be a string or a handle.
// TODO: Figure out how to handle the va_list parameter (Arguments).
// TODO: Figure out how to handle when FORMAT_MESSAGE_ALLOCATE_BUFFER is set
Napi::Value Kernel32::FormatMessageA(const Napi::CallbackInfo &info) {
  const QB_ARG(dwFlags, qb::ReadRequiredUint32(info, 0));
  const QB_ARG(lpSource, qb::ReadOptionalString(info, 1));
  const QB_ARG(dwMessageId, qb::ReadRequiredUint32(info, 2));
  const QB_ARG(dwLanguageId, qb::ReadRequiredUint32(info, 3));
  QB_ARG(lpBuffer, qb::ReadRequiredUint8Buffer(info, 4));
  const QB_ARG(nSize, qb::ReadRequiredUint32(info, 5));
  // const QB_ARG(Arguments, qb::ReadOptionalHandle<void>(info, 5)); ??

  const DWORD result = ::FormatMessageA(dwFlags,
                                        lpSource ? lpSource->c_str() : nullptr,
                                        dwMessageId,
                                        dwLanguageId,
                                        // TODO: Pretty sure I don't want to be doing this...
                                        reinterpret_cast<LPSTR>(lpBuffer),
                                        nSize,
                                        nullptr);

  return Napi::Number::New(info.Env(), result);
}
