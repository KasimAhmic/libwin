#pragma once

#include <napi.h>
#include <windows.h>

#include "../../common/include/macros.hpp"
#include "../../common/include/common.hpp"
#include "../../common/include/arguments.hpp"
#include "../../common/include/properties.hpp"
#include "../../common/include/callback_handler.hpp"

namespace Comctl32
{
  Napi::Value AddMRUStringW(const Napi::CallbackInfo &info);
  Napi::Value CreateMRUListW(const Napi::CallbackInfo &info);
  Napi::Value CreateMappedBitmap(const Napi::CallbackInfo &info);
  Napi::Value CreatePropertySheetPage(const Napi::CallbackInfo &info);
  Napi::Value CreatePropertySheetPageA(const Napi::CallbackInfo &info);
  Napi::Value CreatePropertySheetPageW(const Napi::CallbackInfo &info);
  Napi::Value CreateStatusWindow(const Napi::CallbackInfo &info);
  Napi::Value CreateStatusWindowA(const Napi::CallbackInfo &info);
  Napi::Value CreateStatusWindowW(const Napi::CallbackInfo &info);
  Napi::Value CreateToolbar(const Napi::CallbackInfo &info);
  Napi::Value CreateToolbarEx(const Napi::CallbackInfo &info);
  Napi::Value CreateUpDownControl(const Napi::CallbackInfo &info);
  Napi::Value DPA_Clone(const Napi::CallbackInfo &info);
  Napi::Value DPA_Create(const Napi::CallbackInfo &info);
  Napi::Value DPA_CreateEx(const Napi::CallbackInfo &info);
  Napi::Value DPA_DeleteAllPtrs(const Napi::CallbackInfo &info);
  Napi::Value DPA_DeletePtr(const Napi::CallbackInfo &info);
  Napi::Value DPA_Destroy(const Napi::CallbackInfo &info);
  Napi::Value DPA_DestroyCallback(const Napi::CallbackInfo &info);
  Napi::Value DPA_EnumCallback(const Napi::CallbackInfo &info);
  Napi::Value DPA_GetPtr(const Napi::CallbackInfo &info);
  Napi::Value DPA_GetPtrIndex(const Napi::CallbackInfo &info);
  Napi::Value DPA_Grow(const Napi::CallbackInfo &info);
  Napi::Value DPA_InsertPtr(const Napi::CallbackInfo &info);
  Napi::Value DPA_LoadStream(const Napi::CallbackInfo &info);
  Napi::Value DPA_Merge(const Napi::CallbackInfo &info);
  Napi::Value DPA_SaveStream(const Napi::CallbackInfo &info);
  Napi::Value DPA_Search(const Napi::CallbackInfo &info);
  Napi::Value DPA_SetPtr(const Napi::CallbackInfo &info);
  Napi::Value DPA_Sort(const Napi::CallbackInfo &info);
  Napi::Value DSA_Create(const Napi::CallbackInfo &info);
  Napi::Value DSA_DeleteAllItems(const Napi::CallbackInfo &info);
  Napi::Value DSA_DeleteItem(const Napi::CallbackInfo &info);
  Napi::Value DSA_Destroy(const Napi::CallbackInfo &info);
  Napi::Value DSA_DestroyCallback(const Napi::CallbackInfo &info);
  Napi::Value DSA_EnumCallback(const Napi::CallbackInfo &info);
  Napi::Value DSA_GetItem(const Napi::CallbackInfo &info);
  Napi::Value DSA_GetItemPtr(const Napi::CallbackInfo &info);
  Napi::Value DSA_InsertItem(const Napi::CallbackInfo &info);
  Napi::Value DSA_SetItem(const Napi::CallbackInfo &info);
  Napi::Value DefSubclassProc(const Napi::CallbackInfo &info);
  Napi::Value DestroyPropertySheetPage(const Napi::CallbackInfo &info);
  Napi::Value DllGetVersion(const Napi::CallbackInfo &info);
  Napi::Value DrawInsert(const Napi::CallbackInfo &info);
  Napi::Value DrawStatusText(const Napi::CallbackInfo &info);
  Napi::Value DrawStatusTextA(const Napi::CallbackInfo &info);
  Napi::Value DrawStatusTextW(const Napi::CallbackInfo &info);
  Napi::Value EnumMRUListW(const Napi::CallbackInfo &info);
  Napi::Value FlatSB_EnableScrollBar(const Napi::CallbackInfo &info);
  Napi::Value FlatSB_GetScrollInfo(const Napi::CallbackInfo &info);
  Napi::Value FlatSB_GetScrollPos(const Napi::CallbackInfo &info);
  Napi::Value FlatSB_GetScrollProp(const Napi::CallbackInfo &info);
  Napi::Value FlatSB_GetScrollPropPtr(const Napi::CallbackInfo &info);
  Napi::Value FlatSB_GetScrollRange(const Napi::CallbackInfo &info);
  Napi::Value FlatSB_SetScrollInfo(const Napi::CallbackInfo &info);
  Napi::Value FlatSB_SetScrollPos(const Napi::CallbackInfo &info);
  Napi::Value FlatSB_SetScrollProp(const Napi::CallbackInfo &info);
  Napi::Value FlatSB_SetScrollRange(const Napi::CallbackInfo &info);
  Napi::Value FlatSB_ShowScrollBar(const Napi::CallbackInfo &info);
  Napi::Value FreeMRUList(const Napi::CallbackInfo &info);
  Napi::Value GetEffectiveClientRect(const Napi::CallbackInfo &info);
  Napi::Value GetMUILanguage(const Napi::CallbackInfo &info);
  Napi::Value ImageList_Add(const Napi::CallbackInfo &info);
  Napi::Value ImageList_AddIcon(const Napi::CallbackInfo &info);
  Napi::Value ImageList_AddMasked(const Napi::CallbackInfo &info);
  Napi::Value ImageList_BeginDrag(const Napi::CallbackInfo &info);
  Napi::Value ImageList_Copy(const Napi::CallbackInfo &info);
  Napi::Value ImageList_Create(const Napi::CallbackInfo &info);
  Napi::Value ImageList_Destroy(const Napi::CallbackInfo &info);
  Napi::Value ImageList_DragEnter(const Napi::CallbackInfo &info);
  Napi::Value ImageList_DragLeave(const Napi::CallbackInfo &info);
  Napi::Value ImageList_DragMove(const Napi::CallbackInfo &info);
  Napi::Value ImageList_DragShowNolock(const Napi::CallbackInfo &info);
  Napi::Value ImageList_Draw(const Napi::CallbackInfo &info);
  Napi::Value ImageList_DrawEx(const Napi::CallbackInfo &info);
  Napi::Value ImageList_DrawIndirect(const Napi::CallbackInfo &info);
  Napi::Value ImageList_Duplicate(const Napi::CallbackInfo &info);
  Napi::Value ImageList_EndDrag(const Napi::CallbackInfo &info);
  Napi::Value ImageList_GetBkColor(const Napi::CallbackInfo &info);
  Napi::Value ImageList_GetDragImage(const Napi::CallbackInfo &info);
  Napi::Value ImageList_GetFlags(const Napi::CallbackInfo &info);
  Napi::Value ImageList_GetIcon(const Napi::CallbackInfo &info);
  Napi::Value ImageList_GetIconSize(const Napi::CallbackInfo &info);
  Napi::Value ImageList_GetImageCount(const Napi::CallbackInfo &info);
  Napi::Value ImageList_GetImageInfo(const Napi::CallbackInfo &info);
  Napi::Value ImageList_GetImageRect(const Napi::CallbackInfo &info);
  Napi::Value ImageList_LoadImage(const Napi::CallbackInfo &info);
  Napi::Value ImageList_LoadImageA(const Napi::CallbackInfo &info);
  Napi::Value ImageList_LoadImageW(const Napi::CallbackInfo &info);
  Napi::Value ImageList_Merge(const Napi::CallbackInfo &info);
  Napi::Value ImageList_Read(const Napi::CallbackInfo &info);
  Napi::Value ImageList_Remove(const Napi::CallbackInfo &info);
  Napi::Value ImageList_Replace(const Napi::CallbackInfo &info);
  Napi::Value ImageList_ReplaceIcon(const Napi::CallbackInfo &info);
  Napi::Value ImageList_SetBkColor(const Napi::CallbackInfo &info);
  Napi::Value ImageList_SetDragCursorImage(const Napi::CallbackInfo &info);
  Napi::Value ImageList_SetFilter(const Napi::CallbackInfo &info);
  Napi::Value ImageList_SetFlags(const Napi::CallbackInfo &info);
  Napi::Value ImageList_SetIconSize(const Napi::CallbackInfo &info);
  Napi::Value ImageList_SetImageCount(const Napi::CallbackInfo &info);
  Napi::Value ImageList_SetOverlayImage(const Napi::CallbackInfo &info);
  Napi::Value ImageList_Write(const Napi::CallbackInfo &info);
  Napi::Value InitCommonControls(const Napi::CallbackInfo &info);
  Napi::Value InitCommonControlsEx(const Napi::CallbackInfo &info);
  Napi::Value InitMUILanguage(const Napi::CallbackInfo &info);
  Napi::Value InitializeFlatSB(const Napi::CallbackInfo &info);
  Napi::Value LBItemFromPt(const Napi::CallbackInfo &info);
  Napi::Value MakeDragList(const Napi::CallbackInfo &info);
  Napi::Value MenuHelp(const Napi::CallbackInfo &info);
  Napi::Value PropertySheet(const Napi::CallbackInfo &info);
  Napi::Value PropertySheetA(const Napi::CallbackInfo &info);
  Napi::Value PropertySheetW(const Napi::CallbackInfo &info);
  Napi::Value RegisterClassNameW(const Napi::CallbackInfo &info);
  Napi::Value RemoveWindowSubclass(const Napi::CallbackInfo &info);
  Napi::Value SetWindowSubclass(const Napi::CallbackInfo &info);
  Napi::Value ShowHideMenuCtl(const Napi::CallbackInfo &info);
  Napi::Value Str_SetPtrW(const Napi::CallbackInfo &info);
  Napi::Value UninitializeFlatSB(const Napi::CallbackInfo &info);
  Napi::Value _TrackMouseEvent(const Napi::CallbackInfo &info);
}
