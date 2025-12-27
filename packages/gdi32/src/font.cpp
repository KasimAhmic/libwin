#include "gdi32.hpp"

Napi::Value Gdi32::CreateFontW(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const QB_ARG(nHeight, qb::ReadRequiredInt32(info, 0));
  const QB_ARG(nWidth, qb::ReadRequiredInt32(info, 1));
  const QB_ARG(nEscapement, qb::ReadRequiredInt32(info, 2));
  const QB_ARG(nOrientation, qb::ReadRequiredInt32(info, 3));
  const QB_ARG(cWeight, qb::ReadRequiredInt32(info, 4));
  const QB_ARG(bItalic, qb::ReadRequiredUint32(info, 5));
  const QB_ARG(bUnderline, qb::ReadRequiredUint32(info, 6));
  const QB_ARG(bStrikeOut, qb::ReadRequiredUint32(info, 7));
  const QB_ARG(iCharSet, qb::ReadRequiredUint32(info, 8));
  const QB_ARG(iOutPrecision, qb::ReadRequiredUint32(info, 9));
  const QB_ARG(iClipPrecision, qb::ReadRequiredUint32(info, 10));
  const QB_ARG(iQuality, qb::ReadRequiredUint32(info, 11));
  const QB_ARG(iPitchAndFamily, qb::ReadRequiredUint32(info, 12));
  const QB_ARG(lpszFace, qb::ReadRequiredWideString(info, 13));

  const HFONT hFont = ::CreateFontW(nHeight,
                                    nWidth,
                                    nEscapement,
                                    nOrientation,
                                    cWeight,
                                    bItalic,
                                    bUnderline,
                                    bStrikeOut,
                                    iCharSet,
                                    iOutPrecision,
                                    iClipPrecision,
                                    iQuality,
                                    iPitchAndFamily,
                                    lpszFace.c_str());

  return qb::HandleToBigInt(info, hFont);
}

Napi::Value Gdi32::CreateFontA(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const QB_ARG(nHeight, qb::ReadRequiredInt32(info, 0));
  const QB_ARG(nWidth, qb::ReadRequiredInt32(info, 1));
  const QB_ARG(nEscapement, qb::ReadRequiredInt32(info, 2));
  const QB_ARG(nOrientation, qb::ReadRequiredInt32(info, 3));
  const QB_ARG(cWeight, qb::ReadRequiredInt32(info, 4));
  const QB_ARG(bItalic, qb::ReadRequiredUint32(info, 5));
  const QB_ARG(bUnderline, qb::ReadRequiredUint32(info, 6));
  const QB_ARG(bStrikeOut, qb::ReadRequiredUint32(info, 7));
  const QB_ARG(iCharSet, qb::ReadRequiredUint32(info, 8));
  const QB_ARG(iOutPrecision, qb::ReadRequiredUint32(info, 9));
  const QB_ARG(iClipPrecision, qb::ReadRequiredUint32(info, 10));
  const QB_ARG(iQuality, qb::ReadRequiredUint32(info, 11));
  const QB_ARG(iPitchAndFamily, qb::ReadRequiredUint32(info, 12));
  const QB_ARG(lpszFace, qb::ReadRequiredString(info, 13));

  const HFONT hFont = ::CreateFontA(nHeight,
                                    nWidth,
                                    nEscapement,
                                    nOrientation,
                                    cWeight,
                                    bItalic,
                                    bUnderline,
                                    bStrikeOut,
                                    iCharSet,
                                    iOutPrecision,
                                    iClipPrecision,
                                    iQuality,
                                    iPitchAndFamily,
                                    lpszFace.c_str());

  return qb::HandleToBigInt(info, hFont);
}
