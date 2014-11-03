'cell事件接口  必须先用vbs脚本过渡才能使用js   add  by lval　２０１３年

dim result  '全局变量 来接受js函数计算的结果,再在vbs中调用


'获取string变量的值
Function getStringVar(varname)
   dim varvalue
   varvalue = ""
   dim i
   i = CellWeb1.GetVarType(varname) '0  数值类型   1 字符串类型 2 单元格类型  3区域类型
   if i=1 then
      CellWeb1.getStringVar varname,varvalue
   end if
   getStringVar = varvalue
    
End Function

'获取double变量的值
Function getDoubleVar(varname)
   dim varvalue
   dim i
   i = CellWeb1.GetVarType(varname) '0  数值类型   1 字符串类型 2 单元格类型  3区域类型
   if i=0 then
      CellWeb1.GetDoubleVar varname,varvalue
   end if
   getDoubleVar = varvalue
    
End Function
'获取cell变量的值
Function getCellVar(varname)
   dim col1 ,row1
   dim i
   i = CellWeb1.GetVarType(varname) '0  数值类型   1 字符串类型 2 单元格类型  3区域类型
   if i=2 then
      CellWeb1.GetCellVar varname,col1,row1,CellWeb1.GetCurSheet
   end if
   getCellVar = col1&","&row1
    
End Function
'获取Area变量的值
Function getAreaVar(varname)
   dim  col1, row1, col2, row2
   dim i
   i = CellWeb1.GetVarType(varname) '0  数值类型   1 字符串类型 2 单元格类型  3区域类型
   if i=3 then
      CellWeb1.GetAreaVar varname,col1,row1,col2,row2,CellWeb1.GetCurSheet
   end if
   getAreaVar = col1&","&row1&","&col2&","&row2
    
End Function
'双击页签触发   add  by lval 20130802
Public Sub CellWeb1_AllowEditSheetLabel(sheet, approve)
   approve =0  '屏蔽重命名操作
End Sub
Public Sub CellWeb1_AllowDrop(col1 , row1 , col2 , row2 , dropcol , droprow , approve )
 alert approve
End Sub

Public Sub CellWeb1_EditFinish(ByVal text , ByVal approve)
   'alert text
   'alert approve
End Sub


Public Sub CellWeb1_SheetChanged(ByVal oldsheet , ByVal newsheet )
	ReportJs.Base.CellWeb1_SheetChanged oldsheet,newsheet
End Sub


'单元格内容改变时触发的事件
Public Sub CellWeb1_ChangeCell(ByVal col , ByVal row, ByVal text)
	'msgbox CellWeb1.IsModified() 
	CellWeb1.SetModified 1   '内容是否改变标志      1表示报表内容 已改变，内置标志
	ReportJs.setChangeFlag 1 '内容是否改变标志      1表示报表内容 已改变，自定义标志解决特殊问题
End Sub


'单击单元格时触发的事件
Public Sub CellWeb1_MouseLClick(ByVal col , ByVal row, ByVal updn)
	ReportJs.Base.CellWeb1_MouseLClick col,row,updn
End Sub

'双击单元格时触发的事件
Public Sub CellWeb1_MouseDClick(ByVal col , ByVal row)
	ReportJs.Base.CellWeb1_MouseDClick col,row
End Sub

'点亮函数向导按钮   单击函数帮助说明时触发
Sub CellWeb1_QueryFuncGuide( ByVal name , hasguide   )
     ' name = Mid(name,Instr(name,".")+1,Len(name))
      
      'msgbox name
      
      select case LCase(name) 
	    
		case LCase("QC") 
		       hasguide = 1  
		case LCase("sQC") 
		      hasguide = 1  
		case LCase("wQC") 
		       hasguide = 1  
		case LCase("QM") 
		      hasguide = 1  
		case LCase("sQM") 
		      hasguide = 1  
		case LCase("wQM") 
		      hasguide = 1  
		case LCase("FS") 
		       hasguide = 1  
		case LCase("sFS") 
		       hasguide = 1  
		case LCase("wFS") 
		       hasguide = 1  
		case LCase("LFS") 
		       hasguide = 1  
		case LCase("sLFS") 
		       hasguide = 1  
		case LCase("wLFS") 
		      hasguide = 1  
		case LCase("TFS") 
		      hasguide = 1  
		case LCase("sTFS") 
		       hasguide = 1  
		case LCase("wTFS") 
		       hasguide = 1  
		case LCase("DFS") 
		      hasguide = 1  
		case LCase("sDFS") 
		       hasguide = 1  
		case LCase("wDFS") 
		       hasguide = 1  
		case LCase("JE") 
		       hasguide = 1  
		case LCase("sJE") 
		       hasguide = 1  
		case LCase("wJE") 
		       hasguide = 1  
		case LCase("HL") 
		      hasguide = 1  
		case LCase("XJLL") 
		      hasguide = 1  
		case else
		      hasguide = 0
		       exit sub
    end select

End  Sub
'当点击公式向导按扭时触发
Sub CellWeb1_FuncGuide( byref parentwnd ,byval name  )
   ' name = Mid(name,Instr(name,".")+1,Len(name))
    CellWeb1.InputFormulaToBar userDefinedFuncGuide(name)

End  Sub



Sub CellWeb1_CalcFunc( byval name  , byval rettype , byval paranum ) 
       ' name = Mid(name,Instr(name,".")+1,Len(name))
	'msgbox name
	select case LCase(name) 
	    
		case LCase("QC") 
		       ReportJs.Functions.QC CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("sQC") 
		       ReportJs.Functions.sQC CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("wQC") 
		       ReportJs.Functions.wQC CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("QM") 
		       ReportJs.Functions.QM CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("sQM") 
		       ReportJs.Functions.sQM CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("wQM") 
		       ReportJs.Functions.wQM CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("FS") 
		       ReportJs.Functions.FS CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("sFS") 
		       ReportJs.Functions.sFS CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("wFS") 
		       ReportJs.Functions.wFS CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("LFS") 
		       ReportJs.Functions.LFS CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("sLFS") 
		       ReportJs.Functions.sLFS CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("wLFS") 
		       ReportJs.Functions.wLFS CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("TFS") 
		       ReportJs.Functions.TFS CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("sTFS") 
		       ReportJs.Functions.sTFS CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("wTFS") 
		       ReportJs.Functions.wTFS CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("DFS") 
		       ReportJs.Functions.DFS CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("sDFS") 
		       ReportJs.Functions.sDFS CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("wDFS") 
		       ReportJs.Functions.wDFS CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("JE") 
		       ReportJs.Functions.JE CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("sJE") 
		       ReportJs.Functions.sJE CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("wJE") 
		       ReportJs.Functions.wJE CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("HL") 
		       ReportJs.Functions.HL CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case LCase("XJLL") 
		       ReportJs.Functions.XJLL CellWeb1.GetFuncStringPara (0,isDefault),CellWeb1.GetFuncStringPara (1,isDefault),CellWeb1.GetFuncStringPara (2,isDefault),CellWeb1.GetFuncStringPara (3,isDefault),CellWeb1.GetFuncStringPara (4,isDefault),CellWeb1.GetFuncStringPara (5,isDefault),CellWeb1.GetFuncStringPara (6,isDefault),CellWeb1.GetFuncStringPara (7,isDefault),CellWeb1.GetFuncStringPara (8,isDefault),CellWeb1.GetFuncStringPara (9,isDefault),CellWeb1.GetFuncStringPara (10,isDefault)     
		case else
		       exit sub
    end select
    CellWeb1.SetFuncResult result,"", 0
End Sub


Sub Menu1_ClickMenuItem( byval name)
	name = ucase(name)
	select case name
	case "DATAKEYWORDSET"://关键字设置
	      ReportJs.Base.DataKeyWordSet
	case "DATAKEYWORDINPUT"://关键字录入
	      ReportJs.Base.DataKeyWordInput
	case "DATAKEYWORDCANCEL"://关键字取消  lyl
	      ReportJs.Base.DataKeyWordCancel	      
	case "FILENEW"
	   ReportJs.Base.mnuFileNew_click
	case "FILEOPEN"
	   mnuFileOpen_click
	case "FILEWEBOPEN"
	   mnuFileWebOpen_click
	case "FILESAVE"
	ReportJs.Base.mnuFileSave_click() //孙敬行 2013-8-23
	  // mnuFileSave_click
	case "FILESHEETSAVEAS"
	   mnuFileSheetSaveAs_click
	case "FILEIMPORTTEXT"
	   mnuFileImportText_click
	case "FILEIMPORTCSV"
	   mnuFileImportCSV_click      
	case "FILEIMPORTEXCEL"
	   mnuFileImportExcel_click
	case "FILEEXPORTTEXT"
	   mnuFileExportText_click
	case "FILEEXPORTCSV"
	   mnuFileExportCSV_click   
	case "FILEEXPORTEXCEL"
	   mnuFileExportExcel_click
	case "FILEEXPORTPDF"
	   mnuFileExportPDF_click   
	case "FILEPAGESETUP"
	   mnuFilePageSetup_click
	case "FILEPRINTPREVIEW"
	   mnuFilePrintPreview_click
	case "FILEPRINT"
	   mnuFilePrint_click
	case "FILEEXIT"
	   mnuFileExit_click
	case "EDITUNDO"
	   mnuEditUndo_click
	case "EDITREDO"
	   mnuEditRedo_click
	case "EDITCUT"
	   mnuEditCut_click
	case "EDITCOPY"
	   mnuEditCopy_click
	case "EDITPASTE"
	   mnuEditPaste_click
	case "EDITPASTESPECIAL"
	   mnuEditPasteSpecial_Click 
	case "EDITFIND"
	   mnuEditFind_click
	case "EDITREPLACE"
	   mnuEditReplace_click
	case "EDITGOTO"
	   mnuEditGoto_click
	case "EDITSELECTALL"
	   mnuEditSelectAll_click
	   flag = Menu1.GetMenuItemCheck( "EditSelectAll" )
	   menu1.SetMenuItemCheck "EditSelectAll" ,flag
	case "EDITFILLV"
	   mnuEditFillV_click
	case "EDITINSERTSPECHAR"
	   mnuEditInsertSpeChar_click
	case "EDITHYPERLINK"
	   mnuEditHyperlink_click
	case "VIEWFREEZED"
	   mnuViewFreezed_click
	case "VIEWSHEETLABEL"
	   mnuViewSheetLabel_click
	   flag = Menu1.GetMenuItemCheck( "ViewSheetLabel" )
	   menu1.SetMenuItemCheck "ViewSheetLabel" ,flag
	case "VIEWROWLABEL"
	   mnuViewRowLabel_click
	   flag = Menu1.GetMenuItemCheck( "ViewRowLabel" )
	   menu1.SetMenuItemCheck "ViewRowLabel" ,flag
	case "VIEWCOLLABEL"
	   mnuViewColLabel_click
	   flag = Menu1.GetMenuItemCheck( "ViewColLabel" )
	   menu1.SetMenuItemCheck "ViewColLabel" ,flag
	case "VIEWHSCROLL"
	   mnuViewHScroll_click
	   flag = Menu1.GetMenuItemCheck( "ViewHScroll" )
	   menu1.SetMenuItemCheck "ViewHScroll" ,flag
	case "VIEWVSCROLL"
	   mnuViewVScroll_click
	   flag = Menu1.GetMenuItemCheck( "ViewVScroll" )
	   menu1.SetMenuItemCheck "ViewVScroll" ,flag
	case "FORMATCELLPROPERTY"
	   mnuFormatCellProperty_click
	case "FORMATDRAWBORDER"
	   mnuFormatDrawborder_click
	case "FORMATINSERTPIC"
	   mnuFormatInsertPic_click
	case "FORMATREMOVEPIC"
	   mnuFormatRemovePic_click
	case "FORMATMERGECELL"
	 ReportJs_Formula_mergecell_click() '组合单元     //孙敬行 2013-8-22
	  // mnuFormatMergeCell_click
	case "FORMATUNMERGECELL"
	   mnuFormatUnMergeCell_click
	case "ROWINSERT"
	   mnuRowInsert_click
	case "ROWDELETE"
	   mnuRowDelete_click
	case "ROWAPPEND"
	   mnuRowAppend_click
    case "ROWHEIGHT"
       mnuRowHeight_click
    case "ROWHIDE"
       mnuRowHide_click
    case "ROWUNHIDE"
       mnuRowUnhide_click
    case "ROWBESTHEIGHT"
       mnuRowBestHeight_click
    case "COLINSERT"
       mnuColInsert_click
    case "COLDELETE"
       mnuColDelete_click
    case "COLAPPEND"
       mnuColAppend_click
    case "COLWIDTH"
       mnuColWidth_click
    case "COLHIDE"
       mnuColHide_click
    case "COLUNHIDE"
       mnuColUnhide_click
    case "COLBESTWIDTH"
       mnuColBestWidth_click
    case "SHEETRENAME"
       mnuSheetRename_click
    case "SHEETSIZE"
       mnuSheetSize_click
    case "SHEETPROPTECT"
       mnuSheetProptect_click
    case "SHEETINSERT"
       mnuSheetInsert_click
    case "SHEETDELETE"
       mnuSheetDelete_click
    case "SHEETAPPEND"
       mnuSheetAppend_click
    case "SHEETSORTSTYLE"
       mnuSheetSortStyle_click
    case "SHEETSORTVALUE"
       mnuSheetSortValue_click
    case "FORMULAINPUT"
       ReportJs.Base.mnuFormulaInput_click 
    case "FORMULABATCHINPUT"
       mnuFormulaBatchInput_click
    case "FORMULASERIAL"
       mnuFormulaSerial_click
    case "FORMULACELLSHOW"
       mnuFormulaCellShow_click
    case "FORMULACELLCOLOR"
       mnuFormulaCellColor_click
    case "FORMULALIST"
       mnuFormulaList_click
    case "FORMULARECALC"
       mnuFormulaReCalc_click
    case "USERFUNCDEFINE"
       mnuUserFuncDefine_click 
    case "USERFUNCADD"
       mnuUserFuncAdd_click
    case "USERFUNCDELETE"
       mnuUserFuncDelete   
    case "USERFUNCMODIFY"
       mnuUserFuncModify_click
    case "DATARANGEROTATE"
       mnuDataRangeRotate_click
    case "DATARANGEBLANCE"
       mnuDataRangeBlance_click
    case "DATARANGESORT"
       mnuDataRangeSort_click
    case "DATARANGECLASSSUM"
       mnuDataRangeClassSum_click
    case "DATARANGEQUERY"
       mnuDataRangeQuery_click
    case "DATARANGE3DEASYSUM"
       mnuDataRange3DEasySum_click
    case "DATARANGE3DSUM"
       mnuDataRange3DSum_click
    case "DATARANGE3DVIEW"
       mnuDataRange3DView_click
    case "DATARANGE3DQUERY"
       mnuDataRange3DQuery_click
    case "DATAWZDBARCODE"
       mnuDataWzdBarcode_click
    case "DATAWZDCHART"
       mnuDataWzdChart_click
    case "MENUADDROWCOMPAGE"
       menuAddRowCompage_click
    case "MENUDELROWCOMPAGE"
       menuDelRowCompage_click
    case "MENUADDCOLCOMPAGE"
       menuAddColCompage_click
    case "MENUDELCOLCOMPAGE"
       menuDelColCompage_click
    case "MENUDELALLCOMPAGE"
       menuDelAllCompage_click
    case "DEFINEVARDLG"
       menuDefineVarDlg_click
    case "BACKINDEX"
       cmdBack_click
    end select
		
	
End Sub


'打开本地文档
Public Sub mnuFileOpen_click()
	CellWeb1.OpenFile "", ""
End Sub

'打开远程文档
Public Sub mnuFileWebOpen_click()
	'strFilename = InputBox( "请输入远程服务器上的华表文件名", "打开华表文件", "HTTP://" )
	 'filenameout = listReport()
	 ReportJs.Base.listReport()
	'If strFilename <> "" Then CellWeb1.OpenFile strFilename, ""
End Sub



'表页另存为
Public Sub mnuFileSheetSaveAs_click()
    
    ReportJs.setFileNameOut ""
    ReportJs.Base.mnuFileSave_click
	'CellWeb1.SaveSheet CellWeb1.GetCurSheet
	
	'filenameout=""
	
	'Dim filename
	'filename=InputBox("请输入文件名称:")
	'if filename = "" then
	   ' alert("请输入文件名称")
        'exit Sub
	'end if
	'filename = encodeURI(encodeURI(filename))
	'filenameout = encodeURI(encodeURI(filenameout))
	
	'Dim href 
	'Dim start
	'Dim end1
	'href = window.location.href
	'href = unescape(href)
	'start = 0
	'end1 = InStrRev(href,"/") 
	'href = Left(href,end1)
	'CellWeb1.UploadFile(href + "reportManageAction!saveReportOnLine.action?filename="+filename+"&filenameout=")
End Sub

'读入文本文件
Public Sub mnuFileImportText_click()
	CellWeb1.ImportTextDlg
End Sub

'读入CSV文件
Public Sub mnuFileImportCSV_click()
	On Error Resume Next
	Dim strOpenFileName
	CommonDialog1.Flags = &H4
	CommonDialog1.Filter = "CSV（逗号分隔）文件(*.csv)|*.csv|所有文件 (*.*)|*.*"
	CommonDialog1.FilterIndex = 0
	
	CommonDialog1.Filename = ""
	CommonDialog1.ShowOpen
	If Err <> 32755 Then    ' 用户选择“取消”。
		strOpenFileName = CommonDialog1.Filename
		CellWeb1.ImportCSVFile strOpenFileName, CellWeb1.GetCurSheet()
	End If
End Sub 

'读入Excel文件
Public Sub mnuFileImportExcel_click()
	CellWeb1.ImportExcelDlg
End Sub

'输出文本文件
Public Sub mnuFileExportText_click()
	CellWeb1.ExportTextDlg
End Sub

'输出CSV文件
Public Sub mnuFileExportCSV_click()
	' 如果选择“取消”，则返回空字符串。
	On Error Resume Next
	Dim Filename
	Filename = "新报表.csv"
	CommonDialog1.Flags = &H4 Or &H2 Or &H10 Or &H800
	CommonDialog1.DefaultExt = ".csv"
	CommonDialog1.DialogTitle = "输出CSV文件"
	CommonDialog1.Filter = "CSV（逗号分隔）文件(*.csv)|*.csv|所有文件 (*.*)|*.*"
	CommonDialog1.FilterIndex = 0
	CommonDialog1.Filename = Filename
	CommonDialog1.ShowSave
	If Err <> 32755 Then    ' 用户选择“取消”。
		Filename = CommonDialog1.Filename
	Else
		Filename = ""
	End If
	If Filename <> "" Then
		CellWeb1.ExportCSVFile Filename, CellWeb1.GetCurSheet()
	End If
End Sub

'输出Excel文件
Public Sub mnuFileExportExcel_click()
	CellWeb1.ExportExcelDlg
End Sub

'输出PDF文件
Public Sub mnuFileExportPDF_click()
	' 如果选择“取消”，则返回空字符串。
	On Error Resume Next
	Dim Filename
	Filename = "新报表.pdf"
	CommonDialog1.Flags = &H4 Or &H2 Or &H10 Or &H800
	CommonDialog1.DefaultExt = ".pdf"
	CommonDialog1.DialogTitle = "输出PDF文件"
	CommonDialog1.Filter = "Adobe PDF 文件(*.pdf)|*.pdf|所有文件 (*.*)|*.*"
	CommonDialog1.FilterIndex = 0
	CommonDialog1.Filename = Filename
	CommonDialog1.ShowSave
	If Err <> 32755 Then    ' 用户选择“取消”。
		Filename = CommonDialog1.Filename
	Else
		Filename = ""
	End If
	If Filename <> "" Then
		Dim CurSheet
		Dim Pages
		CurSheet = CellWeb1.GetCurSheet()
		Pages = CellWeb1.PrintGetPages(CurSheet)
		CellWeb1.ExportPdfFile Filename, CurSheet, 0, Pages
	End If
End Sub

'页面设置
Public Sub mnuFilePageSetup_click()
	CellWeb1.PrintPageSetup
End Sub

'打印预览
Public Sub mnuFilePrintPreview_click()
	CellWeb1.PrintPreview True, CellWeb1.GetCurSheet
End Sub

'打印
Public Sub mnuFilePrint_click()
	CellWeb1.PrintSheet True, CellWeb1.GetCurSheet
End Sub

'退出
Public Sub mnuFileExit_click()
	If CellWeb1.IsModified() Then
		rtn = MsgBox( "文档已被更改，是否保存？", vbExclamation or vbYesNoCancel)
		If rtn = vbYes Then
			mnuFileSave_click
		ElseIf rtn = vbCancel Then
			Exit Sub
		End If
	End If
	'msgbox "dddd"
	'window.parent.parent.close() 
	'window_close
End Sub

'**************************************************
'		编辑菜单
'**************************************************
'撤消操作
Public Sub mnuEditUndo_click()
	CellWeb1.Undo
End Sub

'重新操作
Public Sub mnuEditRedo_click()
	CellWeb1.Redo
End Sub

'剪切操作
Public Sub mnuEditCut_click()
 	CellWeb1.GetSelectRange Startcol, Startrow, Endcol, Endrow
    	CellWeb1.CutRange Startcol, Startrow, Endcol, Endrow
End Sub

'复制操作
Public Sub mnuEditCopy_click()
 	CellWeb1.GetSelectRange Startcol, Startrow, Endcol, Endrow
    	CellWeb1.CopyRange Startcol, Startrow, Endcol, Endrow
End Sub

'粘贴操作
Public Sub mnuEditPaste_click()
 	CellWeb1.Paste CellWeb1.GetCurrentCol, CellWeb1.GetCurrentRow, 0, False, False
End Sub

'选择性粘贴
Public Sub mnuEditPasteSpecial_Click()
	CellWeb1.PasteSpecialDlg
End Sub

'查找
Public Sub mnuEditFind_click()
	CellWeb1.FindDialog 0
End Sub

'替换
Public Sub mnuEditReplace_click()
	CellWeb1.FindDialog 1
End Sub

'定位
Public Sub mnuEditGoto_click()
	MsgBox "暂无此功能"
End Sub

'全选
Public Sub mnuEditSelectAll_click()
	With CellWeb1
		If IsSelectAll Then
		    .ClearSelection
		    .Invalidate
		Else
		    .SelectRange 1, 1, .GetCols(.GetCurSheet) - 1, .GetRows(.GetCurSheet) - 1
		    .Invalidate
		End If
	End With	
End Sub

'判断表格是否处于全选状态
Public Function IsSelectAll()
	With CellWeb1
	        .GetSelectRange StartCol, StartRow, EndCol, EndRow
	        If StartCol = 1 And StartRow = 1 And _
	        EndCol = .GetCols(.GetCurSheet) - 1 And EndRow = .GetRows(.GetCurSheet) - 1 Then
	            IsSelectAll = True
	        Else
	            IsSelectAll = False
	        End If
    End With
End Function

'垂直填充
Public Sub mnuEditFillV_click()
	CellWeb1.FillBetweenSheet
End Sub

'插入特殊符号
Public Sub mnuEditInsertSpeChar_click()
	CellWeb1.InsertSpecialCharDlg
End Sub

'超级链接
Public Sub mnuEditHyperlink_click()
	CellWeb1.HyperlinkDlg
End Sub

'**************************************************
'		视图菜单
'**************************************************

'判断表页是否存在不滚动行列
Public Function IsFreezed()
    With CellWeb1
        '设置不滚动行列
        .GetFixedCol StartCol, EndCol
        .GetFixedRow StartRow, EndRow
        '判断是否存在不滚动行或列
        If (EndCol > 0 And StartCol > 0) Or (EndRow > 0 And StartRow > 0) Then
		IsFreezed = True
        Else
       		IsFreezed = False
        End If
    End With
End Function

'设置不滚动行列
Public Sub mnuViewFreezed_click()
	If IsFreezed Then
		CellWeb1.SetFixedCol 0, -1
        	CellWeb1.SetFixedRow 0, -1
        Else
        	CellWeb1.SetFixedCol 1, CellWeb1.GetCurrentCol - 1
        	CellWeb1.SetFixedRow 1, CellWeb1.GetCurrentRow - 1
        End If
End Sub

'页签
Public Sub mnuViewSheetLabel_click()
	With CellWeb1
		If .GetSheetLabelState(.GetCurSheet) Then
			.ShowSheetLabel 0, .GetCurSheet
		Else 
			.ShowSheetLabel 1, .GetCurSheet
		End If
	End With
End Sub

'行标
Public Sub mnuViewRowLabel_click()
	With CellWeb1
		If .GetTopLabelState(.GetCurSheet) Then
			.ShowTopLabel 0, .GetCurSheet
		Else 
			.ShowTopLabel 1, .GetCurSheet
		End If
	End With
End Sub

'列标
Public Sub mnuViewColLabel_click()
	With CellWeb1
		If .GetSideLabelState(.GetCurSheet) Then
			.ShowSideLabel 0, .GetCurSheet
		Else 
			.ShowSideLabel 1, .GetCurSheet
		End If
	End With
End Sub

'水平滚动条
Public Sub mnuViewHScroll_click()
	With CellWeb1
		If .GetHScrollState(.GetCurSheet) Then
			.ShowHScroll 0, .GetCurSheet
		Else 
			.ShowHScroll 1, .GetCurSheet
		End If
	End With
End Sub

'垂直滚动条
Public Sub mnuViewVScroll_click()
	With CellWeb1
		If .GetVScrollState(.GetCurSheet) Then
			.ShowVScroll 0, .GetCurSheet
		Else 
			.ShowVScroll 1, .GetCurSheet
		End If
	End With
End Sub


'**************************************************
'		格式菜单
'**************************************************
'单元格属性
Public Sub mnuFormatCellProperty_click()
	CellWeb1.CellPropertyDlg
End Sub
'画/抹表格线
Public Sub mnuFormatDrawborder_click()
	CellWeb1.DrawLineDlg
End Sub

'插入图片
Public Sub mnuFormatInsertPic_click()
	CellWeb1.SetCellImageDlg
	CellWeb1.Invalidate
End Sub

'删除图片
Public Sub mnuFormatRemovePic_click()
	curSheet = CellWeb1.GetCurSheet
	CellWeb1.GetSelectRange Startcol, Startrow, Endcol, Endrow
	
	For col =  Startcol to Endcol
		For row = Startrow to Endrow
			CellWeb1.RemoveCellImage col, row, curSheet
		Next
	Next
End Sub

//孙敬行
 
Public Sub ReportJs_Formula_mergecell_click() '组合单元
	ReportJs.Base.Formula_mergecell_click
End Sub
//--end--孙敬行------



'设置单元格组合
Public Sub mnuFormatMergeCell_click()
	CellWeb1.GetSelectRange StartCol, StartRow, EndCol, EndRow
	CellWeb1.MergeCells StartCol, StartRow, EndCol, EndRow
End Sub

'取消单元格组合
Public Sub mnuFormatUnMergeCell_click()
	CellWeb1.GetSelectRange StartCol, StartRow, EndCol, EndRow
	For col = StartCol To EndCol
		For row = StartRow To EndRow
		    CellWeb1.GetMergeRange col, row, StartCol1, StartRow1, EndCol1, EndRow1
		    CellWeb1.UnmergeCells StartCol1, StartRow1, EndCol1, EndRow1
		Next
	Next
End Sub

Public Sub menuAddRowCompage_click()
CellWeb1.GetSelectRange col1,row1,col2,row2
CellWeb1.AddRowCompages row1,row2 
End Sub

Public Sub menuDelRowCompage_click()
CellWeb1.GetSelectRange col1,row1,col2,row2
CellWeb1.DeleteRowCompages row1,row2 
End Sub

Public Sub menuAddColCompage_click()
CellWeb1.GetSelectRange col1,row1,col2,row2
CellWeb1.AddColCompages col1,col2 
End Sub

Public Sub menuDelColCompage_click()
CellWeb1.GetSelectRange col1,row1,col2,row2
CellWeb1.DeleteColCompages col1,col2 
End Sub

Public Sub menuDelAllCompage_click()
CellWeb1.RemoveAllCompages
End Sub       

       
'**************************************************
'		表行列菜单
'**************************************************

'插入表行
Public Sub mnuRowInsert_click()
	CellWeb1.InsertRowDlg
End Sub

'删除表行
Public Sub mnuRowDelete_click()
	CellWeb1.DeleteRowDlg
End Sub

'追加表行
Public Sub mnuRowAppend_click()
	CellWeb1.AppendRowDlg
End Sub

'行高
Public Sub mnuRowHeight_click()
	CellWeb1.RowHeightDlg
End Sub

'隐藏行
Public Sub mnuRowHide_click()
	CellWeb1.GetSelectRange StartCol, StartRow, EndCol, EndRow
	CellWeb1.SetRowHidden StartRow, EndRow
End Sub

'取消隐藏行
Public Sub mnuRowUnhide_click()
	CellWeb1.GetSelectRange StartCol, StartRow, EndCol, EndRow
	CellWeb1.SetRowUnhidden StartRow, EndRow
End Sub

'最合适行高
Public Sub mnuRowBestHeight_click()
	With CellWeb1
		CurSheet = .GetCurSheet
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		For i = StartRow To EndRow
		    BestHeight = .GetRowBestHeight(i)
		    If BestHeight <> 0 Then
		    	.SetRowHeight 1, BestHeight, i, CurSheet
		    End If
		Next
		.Invalidate
	End With
End Sub

'插入表列
Public Sub mnuColInsert_click()
	CellWeb1.InsertColDlg
End Sub

'删除表列
Public Sub mnuColDelete_click()
	CellWeb1.DeleteColDlg
End Sub

'追加表列
Public Sub mnuColAppend_click()
	CellWeb1.AppendColDlg
End Sub

'列宽
Public Sub mnuColWidth_click()
	CellWeb1.ColWidthDlg
End Sub

'隐藏列
Public Sub mnuColHide_click()
	CellWeb1.GetSelectRange StartCol, StartRow, EndCol, EndRow
	CellWeb1.SetColHidden StartCol, EndCol
End Sub

'取消隐藏列
Public Sub mnuColUnhide_click()
	CellWeb1.GetSelectRange StartCol, StartRow, EndCol, EndRow
	CellWeb1.SetColUnhidden StartCol, EndCol
End Sub

'最合适列宽
Public Sub mnuColBestWidth_click()
	With CellWeb1
		CurSheet = .GetCurSheet
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		For i = StartCol To EndCol
		    BestWidth = .GetColBestWidth(i)
		    If BestWidth <> 0 Then
		        .SetColWidth 1, BestWidth, i, .GetCurSheet
		        .Invalidate
		    End If
		Next
	End With
End Sub

'**************************************************
'		表页菜单
'**************************************************

'页签改名字
Public Sub mnuSheetRename_click()
	CellWeb1.SheetLabelRenameDlg
End Sub

'表页尺寸
Public Sub mnuSheetSize_click()
	CellWeb1.SetSheetSizeDlg
End Sub

'表页保护
Public Sub mnuSheetProptect_click()
	With CellWeb1
		If .IsSheetProtect( .GetCurSheet ) Then '已经被保护了
			a = .SheetUnprotectDlg()
			MsgBox a
			If .SheetUnprotectDlg() = 0 Then
				MsgBox "密码不对，表页解锁失败！", vbExclamation
				Exit Sub
			Else
				MsgBox "恭喜你，表页解锁成功！", vbExclamation
				Exit Sub
			End If
		Else
			.SheetProtectDlg
		End If
	End With
End Sub

'插入表页
Public Sub mnuSheetInsert_click()
	CellWeb1.InsertSheetDlg
End Sub

'删除表页
Public Sub mnuSheetDelete_click()
	CellWeb1.DeleteSheetDlg
End Sub

'追加表页
Public Sub mnuSheetAppend_click()
	CellWeb1.AppendSheetDlg
End Sub

'格式页排序
Public Sub mnuSheetSortStyle_click()
	CellWeb1.SortStyleSheetDlg
End Sub

'数据页排序
Public Sub mnuSheetSortValue_click()
	CellWeb1.SortValueSheetDlg
End Sub

'**************************************************
'		公式菜单
'**************************************************

'输入公式
'Public Sub mnuFormulaInput_click()
	'With CellWeb1
		'.FormulaWizard .GetCurrentCol, .GetCurrentRow
	'End With	
	''showReportHelp ' add by lval 20130722
	'gsStr = userDefinedFuncGuide 'QC'
	' CellWeb1.InputFormulaToBar gsStr
	
'End Sub

'批量录入公式
Public Sub mnuFormulaBatchInput_click()
	CellWeb1.BatchInputFormulaDlg
End Sub

'填充公式序列
Public Sub mnuFormulaSerial_click()
	CellWeb1.FormulaFillSerial
End Sub

'定义单元格显示公式
Public Sub mnuFormulaCellShow_click()
	CellWeb1.SetCellFormulaShowDlg
End Sub

'定义单元格颜色公式
Public Sub mnuFormulaCellColor_click()
	CellWeb1.SetCellFormulaColorDlg
End Sub

'公式列表
Public Sub mnuFormulaList_click()
	CellWeb1.FormulaListDlg
End Sub

'重算全表
Public Sub mnuFormulaReCalc_click()
	CellWeb1.CalculateAll '重算全表
	'MsgBox "计算完毕", vbExclamation
End Sub




'定义自定义函数
Public Sub mnuUserFuncDefine_click()
	Str = """我的函数"" Any XX( String str, [Double num] )"
	Str = Str & vbCrLf & "BEGIN_HELP"
	Str = Str & vbCrLf & "XX( String str, [Double num] )"
	Str = Str & vbCrLf & "本函数演示如何使用缺省参数"
	Str = Str & vbCrLf & "END_HELP"
	MsgBox Str, vbInformation
	CellWeb1.DefineFunctions Str
End Sub

'增加自定义函数
Public Sub mnuUserFuncAdd_click()
    Str = """我的函数"" Any YY( String str, Double num )"
    Str = Str & vbCrLf & "BEGIN_HELP"
    Str = Str & vbCrLf & "YY( String str, Double num )"
    Str = Str & vbCrLf & "本函数演示在实用过程中更改函数定义"
    Str = Str & vbCrLf & "END_HELP"
    Str = Str & vbCrLf & """我的函数"" Any ZZ( String str, Double num )"
    Str = Str & vbCrLf & "BEGIN_HELP"
    Str = Str & vbCrLf & "ZZ( String str, Double num )"
    Str = Str & vbCrLf & "本函数演示函数向导"
    Str = Str & vbCrLf & "END_HELP"
    MsgBox Str, vbInformation
    CellWeb1.DefineFunctions Str
End Sub

'删除自定义函数
Public Sub mnuUserFuncDelete_click()
	    CellWeb1.DelUserFunction "XX"
End Sub

'修改自定义函数
Public Sub mnuUserFuncModify_click()
	Str = """我的函数"" Any YY( String str )"
	Str = Str & vbCrLf & "BEGIN_HELP"
	Str = Str & vbCrLf & "YY( String str )"
	Str = Str & vbCrLf & "现在本函数只有一个参数了"
	Str = Str & vbCrLf & "END_HELP"
	MsgBox Str, vbInformation
	CellWeb1.DefineFunctions Str
End Sub

'**************************************************
'		数据菜单
'**************************************************

'数据转置
Public Sub mnuDataRangeRotate_click()
	CellWeb1.RangeRotateDlg
End Sub

'舍位平衡
Public Sub mnuDataRangeBlance_click()
	CellWeb1.BlanceDlg
End Sub

'区域排序
Public Sub mnuDataRangeSort_click()
	CellWeb1.RangeSortDlg
End Sub

'区域分类汇总
Public Sub mnuDataRangeClassSum_click()
	CellWeb1.RangeClassSumDlg
End Sub

'区域查询
Public Sub mnuDataRangeQuery_click()
	CellWeb1.RangeQueryDlg
End Sub

'简单区域汇总
Public Sub mnuDataRange3DEasySum_click()
	CellWeb1.Range3DEasySumDlg
End Sub

'页间区域汇总
Public Sub mnuDataRange3DSum_click()
	CellWeb1.Range3DSumDlg
End Sub

'页间区域透视
Public Sub mnuDataRange3DView_click()
	CellWeb1.Range3DViewDlg
End Sub

'页间区域查询
Public Sub mnuDataRange3DQuery_click()
	CellWeb1.Range3DQueryDlg
End Sub

'条形码向导
Public Sub mnuDataWzdBarcode_click()
	CellWeb1.WzdBarCodeDlg
End Sub

'图表向导
Public Sub mnuDataWzdChart_click()
	CellWeb1.WzdChartDlg
End Sub

Public Sub menuDefineVarDlg_click()
	CellWeb1.DefineVariableDlg
End Sub




'******************************************************************************************
'****************          工具条中的命令
'******************************************************************************************

'升序排序
Public Sub cmdSortAscending_click()
	CellWeb1.GetSelectRange StartCol, StartRow, EndCol, EndRow
	If StartRow = EndRow And StartCol <> EndCol Then
		CellWeb1.SortRow 1, StartRow, StartCol, StartRow, EndCol, EndRow
	ElseIf StartCol = EndCol And StartRow <> EndRow Then
		CellWeb1.SortCol 1, StartCol, StartCol, StartRow, EndCol, EndRow
	ElseIf StartRow <> EndRow And StartCol <> EndCol Then
		mnuDataRangeSort_click
	End If
End Sub

'降序排序
Public Sub cmdSortDescending_click()
	CellWeb1.GetSelectRange StartCol, StartRow, EndCol, EndRow
	If StartRow = EndRow And StartCol <> EndCol Then
		CellWeb1.SortRow 0, StartRow, StartCol, StartRow, EndCol, EndRow
	ElseIf StartCol = EndCol And StartRow <> EndRow Then
		CellWeb1.SortCol 0, StartCol, StartCol, StartRow, EndCol, EndRow
	ElseIf StartRow <> EndRow And StartCol <> EndCol Then
		mnuDataRangeSort_Click
	End If
End Sub

'水平求和
Public Sub cmdFormulaSumH_click()
	With CellWeb1
		StartCol = 0: StartRow = 0: EndCol = 0: EndRow = 0
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		If StartCol = EndCol Then
			MsgBox "请选择一个矩形区域！", vbExclamation
			Exit Sub
		Else
			For i = StartRow To EndRow
				formula = "sum(" & .CellToLabel(StartCol, i) & ":" & .CellToLabel(EndCol - 1, i) & ")"
				.SetFormula EndCol, i, .GetCurSheet, formula
			Next
		End If
		.Invalidate
	End With
End Sub

'垂直求和
Public Sub cmdFormulaSumV_click()
	With CellWeb1
		StartCol = 0: StartRow = 0: EndCol = 0: EndRow = 0
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		If StartRow = EndRow Then
			MsgBox "请选择一个矩形区域！", vbExclamation
			Exit Sub
		Else
			For i = StartCol To EndCol
				formula = "sum(" & .CellToLabel(i, StartRow) & ":" & .CellToLabel(i, EndRow - 1) & ")"
				.SetFormula i, EndRow, .GetCurSheet, formula
			Next
		End If
		.Invalidate
	End With
End Sub

'双向求和
Public Sub cmdFormulaSumHV_click()
	With CellWeb1	
		StartCol = 0: StartRow = 0: EndCol = 0: EndRow = 0
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		If StartRow = EndRow Or StartCol = EndCol Then
			MsgBox "请选择一个矩形区域！", vbExclamation
			Exit Sub
		Else
			For i = StartRow To EndRow - 1
				formula = "sum(" & .CellToLabel(StartCol, i) & ":" & .CellToLabel(EndCol - 1, i) & ")"
				.SetFormula EndCol, i, .GetCurSheet, formula
			Next
			For i = StartCol To EndCol - 1
				formula = "sum(" & .CellToLabel(i, StartRow) & ":" & .CellToLabel(i, EndRow - 1) & ")"
				.SetFormula i, EndRow, .GetCurSheet, formula
			Next
			formula = "sum(" & .CellToLabel(StartCol, StartRow) & ":" & .CellToLabel(EndCol - 1, EndRow - 1) & ")"
			.SetFormula EndCol, EndRow, .GetCurSheet, formula
		End If
		.Invalidate
	End With
End Sub

'设置粗体
Public Sub cmdBold_click()
	With CellWeb1
	        .GetSelectRange StartCol, StartRow, EndCol, EndRow
	        CurCol = .GetCurrentCol
	        CurRow = .GetCurrentRow
	        CurSheet = .GetCurSheet
	        FontStyle = .GetCellFontStyle(CurCol, CurRow, CurSheet)
	        If (FontStyle And 2) = 2 Then
                    For i = StartCol To EndCol
                        For j = StartRow To EndRow
                            FontStyle = .GetCellFontStyle(i, j, CurSheet)
                            .SetCellFontStyle i, j, CurSheet, (FontStyle AND (8+4))
                        Next
                    Next
                Else
                    For i = StartCol To EndCol
                        For j = StartRow To EndRow
                            FontStyle = .GetCellFontStyle(i, j, CurSheet)
                            .SetCellFontStyle i, j, CurSheet,  FontStyle OR 2
                        Next
                    Next
                End If
                .Invalidate
       	End With
End Sub

'设置斜体
Public Sub cmdItalic_click()
	With CellWeb1
	        .GetSelectRange StartCol, StartRow, EndCol, EndRow
	        CurCol = .GetCurrentCol
	        CurRow = .GetCurrentRow
	        CurSheet = .GetCurSheet
	        FontStyle = .GetCellFontStyle(CurCol, CurRow, CurSheet)
	        If (FontStyle And 4) = 4 Then
                    For i = StartCol To EndCol
                        For j = StartRow To EndRow
                            FontStyle = .GetCellFontStyle(i, j, CurSheet)
                            .SetCellFontStyle i, j, CurSheet, (FontStyle AND (8+2))
                        Next
                    Next
                Else
                    For i = StartCol To EndCol
                        For j = StartRow To EndRow
                            FontStyle = .GetCellFontStyle(i, j, CurSheet)
                            .SetCellFontStyle i, j, CurSheet,  FontStyle OR 4
                        Next
                    Next
                End If
                .Invalidate
       	End With	
End Sub

'设置下划线
Public Sub cmdUnderline_click()
	With CellWeb1
	        .GetSelectRange StartCol, StartRow, EndCol, EndRow
	        CurCol = .GetCurrentCol
	        CurRow = .GetCurrentRow
	        CurSheet = .GetCurSheet
	        FontStyle = .GetCellFontStyle(CurCol, CurRow, CurSheet)
	        If (FontStyle And 8) = 8 Then
                    For i = StartCol To EndCol
                        For j = StartRow To EndRow
                            FontStyle = .GetCellFontStyle(i, j, CurSheet)
                            .SetCellFontStyle i, j, CurSheet, (FontStyle AND (4+2))
                        Next
                    Next
                Else
                    For i = StartCol To EndCol
                        For j = StartRow To EndRow
                            FontStyle = .GetCellFontStyle(i, j, CurSheet)
                            .SetCellFontStyle i, j, CurSheet,  FontStyle OR 8
                        Next
                    Next
                End If
                .Invalidate
       	End With	
End Sub

'设置背景色
Public Sub cmdBackColor_click()
	With CellWeb1
	        On Error Resume Next
	        CommonDialog1.Flags = &H2 or &H8
	        CommonDialog1.ShowColor
	        .GetSelectRange StartCol, StartRow, EndCol, EndRow
	        For i = StartCol To EndCol
	            For j = StartRow To EndRow
	                If .FindColorIndex(CommonDialog1.Color, 1) <> -1 Then
	                    If Err <> 32755 Then
	                        .SetCellBackColor i, j, CurSheet, .FindColorIndex(CommonDialog1.Color, 1)
	                     End If
	                End If
	            Next
	        Next
	        .Invalidate
        End With
End Sub

'设置前景色
Public Sub cmdForeColor_click()
	With CellWeb1
	        On Error Resume Next
	        CommonDialog1.Flags = &H2 or &H8
	        CommonDialog1.ShowColor
	        .GetSelectRange StartCol, StartRow, EndCol, EndRow
	        For i = StartCol To EndCol
	            For j = StartRow To EndRow
	                If .FindColorIndex(CommonDialog1.Color, 1) <> -1 Then
	                    If Err <> 32755 Then
	                        .SetCellTextColor i, j, CurSheet, .FindColorIndex(CommonDialog1.Color, 1)
	                    End If
	                End If
	            Next
	        Next
	        .Invalidate
	End With
End Sub

'自动折行
Public Sub cmdWordWrap_click()
	With CellWeb1
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		CurCol = .GetCurrentCol
	        CurRow = .GetCurrentRow
	        CurSheet = .GetCurSheet
		If .GetCellTextStyle(CurCol, CurRow, CurSheet) = 2 Then'当前单元格为折行状态
		     For i = StartCol To EndCol
                        For j = StartRow To EndRow
                            .SetCellTextStyle i, j, CurSheet, 0
                        Next
                     Next
                Else
                     For i = StartCol To EndCol
                        For j = StartRow To EndRow
                            .SetCellTextStyle i, j, CurSheet, 2
                        Next
                     Next
                End If
                .Invalidate
	End With
End Sub

'居左对齐
Public Sub cmdAlignLeft_click()
	With CellWeb1
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		CurCol = .GetCurrentCol
	        CurRow = .GetCurrentRow
	        CurSheet = .GetCurSheet
	        hAlign = .GetCellAlign(CurCol, CurRow, CurSheet)
	        If (HAlign and 1) = 1 Then
	        	hAlign = 0
	        Else
	        	hAlign = 1
		End If
		For i = StartCol To EndCol
			For j = StartRow To EndRow
			    vAlign = .GetCellAlign( i, j, CurSheet) and (8+16+32)
			    align = vAlign + hAlign
			    .SetCellAlign i, j, CurSheet, align
			Next
		Next		
		.Invalidate
	End With
End Sub

'居中对齐
Public Sub cmdAlignCenter_click()
	With CellWeb1
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		CurCol = .GetCurrentCol
	        CurRow = .GetCurrentRow
	        CurSheet = .GetCurSheet
	        hAlign = .GetCellAlign(CurCol, CurRow, CurSheet)
	        If (HAlign and 4) = 4 Then
	        	hAlign = 0
	        Else
	        	hAlign = 4
		End If
		For i = StartCol To EndCol
			For j = StartRow To EndRow
			    vAlign = .GetCellAlign( i, j, CurSheet) and (8+16+32)
			    align = vAlign + hAlign
			    .SetCellAlign i, j, CurSheet, align
			Next
		Next		
		.Invalidate
	End With
End Sub

'居右对齐
Public Sub cmdAlignRight_click()
	With CellWeb1
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		CurCol = .GetCurrentCol
	        CurRow = .GetCurrentRow
	        CurSheet = .GetCurSheet
	        hAlign = .GetCellAlign(CurCol, CurRow, CurSheet)
	        If (HAlign and 2) = 2 Then
	        	hAlign = 0
	        Else
	        	hAlign = 2
		End If
		For i = StartCol To EndCol
			For j = StartRow To EndRow
			    vAlign = .GetCellAlign( i, j, CurSheet) and (8+16+32)
			    align = vAlign + hAlign
			    .SetCellAlign i, j, CurSheet, align
			Next
		Next		
		.Invalidate
	End With
End Sub

'居上对齐
Public Sub cmdAlignTop_click()
	With CellWeb1
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		CurCol = .GetCurrentCol
	        CurRow = .GetCurrentRow
	        CurSheet = .GetCurSheet
	        vAlign = .GetCellAlign(CurCol, CurRow, CurSheet)
	        If (HAlign and 8) = 8 Then
	        	vAlign = 0
	        Else
	        	vAlign = 8
		End If
		For i = StartCol To EndCol
			For j = StartRow To EndRow
			    hAlign = .GetCellAlign( i, j, CurSheet) and (1+2+4)
			    align = vAlign + hAlign
			    .SetCellAlign i, j, CurSheet, align
			Next
		Next		
		.Invalidate
	End With
End Sub

'垂直居中对齐
Public Sub cmdAlignMiddle_click()
	With CellWeb1
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		CurCol = .GetCurrentCol
	        CurRow = .GetCurrentRow
	        CurSheet = .GetCurSheet
	        vAlign = .GetCellAlign(CurCol, CurRow, CurSheet)
	        If (HAlign and 32) = 32 Then
	        	vAlign = 0
	        Else
	        	vAlign = 32
		End If
		For i = StartCol To EndCol
			For j = StartRow To EndRow
			    hAlign = .GetCellAlign( i, j, CurSheet) and (1+2+4)
			    align = vAlign + hAlign
			    .SetCellAlign i, j, CurSheet, align
			Next
		Next		
		.Invalidate
	End With
End Sub

'居下对齐
Public Sub cmdAlignBottom_click()
	With CellWeb1
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		CurCol = .GetCurrentCol
	        CurRow = .GetCurrentRow
	        CurSheet = .GetCurSheet
	        vAlign = .GetCellAlign(CurCol, CurRow, CurSheet)
	        If (HAlign and 16) = 16 Then
	        	vAlign = 0
	        Else
	        	vAlign = 16
		End If
		For i = StartCol To EndCol
			For j = StartRow To EndRow
			    hAlign = .GetCellAlign( i, j, CurSheet) and (1+2+4)
			    align = vAlign + hAlign
			    .SetCellAlign i, j, CurSheet, align
			Next
		Next		
		.Invalidate
	End With
End Sub

'画边框线
Public Sub cmdDrawBorder_click()
	With CellWeb1
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		CurSheet = .GetCurSheet
		.DrawGridLine StartCol, StartRow, EndCol, EndRow, 0, BorderTypeSelect.value, -1
        End With
End Sub

'抹框线
Public Sub cmdEraseBorder_click()
	With CellWeb1
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		CurSheet = .GetCurSheet
		.ClearGridLine StartCol, StartRow, EndCol, EndRow, 0
        End With
End Sub

'货币符号
Public Sub cmdCurrency_click()
	With CellWeb1
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		CurSheet = .GetCurSheet
		For i = StartCol To EndCol
			For j = StartRow To EndRow
			    .SetCellCurrency i, j, CurSheet, 2
			Next
		Next		
		.Invalidate
        End With
End Sub

'百分号
Public Sub cmdPercent_click()
	With CellWeb1
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		CurCol = .GetCurrentCol
	        CurRow = .GetCurrentRow
	        CurSheet = .GetCurSheet
	        If .GetCellNumType( CurCol, CurRow, CurSheet) = 5 Then
			For i = StartCol To EndCol
				For j = StartRow To EndRow
				    .SetCellNumType i, j, CurSheet, 0
				Next
			Next		
		Else 
			For i = StartCol To EndCol
				For j = StartRow To EndRow
				    .SetCellNumType i, j, CurSheet, 5
				Next
			Next	
		End If	
		.Invalidate
	End With
End Sub

'千分位
Public Sub cmdThousand_click()
	With CellWeb1
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		CurCol = .GetCurrentCol
	        CurRow = .GetCurrentRow
	        CurSheet = .GetCurSheet
	        If .GetCellSeparator( CurCol, CurRow, CurSheet) = 2 Then
	        	For i = StartCol To EndCol
				For j = StartRow To EndRow
				    .SetCellNumType i, j, CurSheet, 1
				    .SetCellSeparator i, j, CurSheet, 1
                            	Next
			Next		
		Else 
			For i = StartCol To EndCol
				For j = StartRow To EndRow
				    .SetCellNumType i, j, CurSheet, 1
				    .SetCellSeparator i, j, CurSheet, 2
				Next
			Next	
		End If	
		.Invalidate
	End With
End Sub

'关于华表插件
Public Sub cmdAbout_click()
	CellWeb1.AboutBox
End Sub

'插入列
Public Sub cmdInsertCol_click()
	With CellWeb1
		StartCol = 0: StartRow = 0: EndCol = 0: EndRow = 0
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		.InsertCol StartCol, EndCol - StartCol + 1, .GetCurSheet
	End With
End Sub

'插入行
Public Sub cmdInsertRow_click()
	With CellWeb1
		StartCol = 0: StartRow = 0: EndCol = 0: EndRow = 0
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		.InsertRow StartRow, EndRow - StartRow + 1, .GetCurSheet
	End With
End Sub

'追加列
Public Sub cmdAppendCol_click()
	With CellWeb1
		StartCol = 0: StartRow = 0: EndCol = 0: EndRow = 0
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		.InsertCol .GetCols(.GetCurSheet), EndCol - StartCol + 1, .GetCurSheet
	End With
End Sub

'追加行
Public Sub cmdAppendRow_click()
	With CellWeb1
		StartCol = 0: StartRow = 0: EndCol = 0: EndRow = 0
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		.InsertRow .GetRows(.GetCurSheet), EndRow - StartRow + 1, .GetCurSheet
	End With
End Sub

'删除列
Public Sub cmdDeleteCol_click()
	With CellWeb1
		StartCol = 0: StartRow = 0: EndCol = 0: EndRow = 0
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		.DeleteCol StartCol, EndCol - StartCol + 1, .GetCurSheet
	End With
End Sub

'删除行
Public Sub cmdDeleteRow_click()
	With CellWeb1
		StartCol = 0: StartRow = 0: EndCol = 0: EndRow = 0
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		.DeleteRow StartRow, EndRow - StartRow + 1, .GetCurSheet
	End With
End Sub

'表页尺寸
Public Sub cmdSheetSize_click()
	With CellWeb1
		.SetCols .GetCurrentCol + 1, .GetCurSheet
		.SetRows .GetCurrentRow + 1, .GetCurSheet
	End With
End Sub

'行组合
Public Sub cmdMergeRow_click()
	With CellWeb1
		StartCol = 0: StartRow = 0: EndCol = 0: EndRow = 0
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		For i = StartRow To EndRow
			.MergeCells StartCol, i, EndCol, i
		Next
        End With
End Sub

'列组合
Public Sub cmdMergeCol_click()
	With CellWeb1
		StartCol = 0: StartRow = 0: EndCol = 0: EndRow = 0
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		For i = StartCol To EndCol
			.MergeCells i, StartRow, i, EndRow
		Next
        End With
End Sub

'设置汇总公式
Public Sub cmdFormulaSum3D_click()
	With CellWeb1
           StartCol = 0: StartRow = 0: EndCol = 0: EndRow = 0
           .GetSelectRange StartCol, StartRow, EndCol, EndRow
           If .GetTotalSheets() > 1 Then
                For i = StartCol To EndCol
                    For j = StartRow To EndRow
                        If .GetCurSheet() = 0 Then
                            .SetFormula i, j, .GetCurSheet, "Sum3D( CurCell() , loopsheet() >=" & CStr(2) & " AND loopsheet() <=" & CStr(.GetTotalSheets()) & ")"
                        Else
                            .SetFormula i, j, .GetCurSheet, "Sum3D( CurCell() , loopsheet() >= 1 AND loopsheet() <= " & CStr(.GetCurSheet()) & ")"
                        End If
                    Next
                Next
            Else:
                MsgBox "当前单元格只有一页，不能进行汇总。", vbExclamation
            End If
            .Invalidate
	End With
End Sub

'单元格只读
Public Sub cmdReadOnly_click()
	With CellWeb1
		.GetSelectRange StartCol, StartRow, EndCol, EndRow
		CurCol = .GetCurrentCol
	        CurRow = .GetCurrentRow
	        CurSheet = .GetCurSheet
	        If .GetCellInput( CurCol, CurRow, CurSheet) = 5 Then
			For i = StartCol To EndCol
				For j = StartRow To EndRow
				    .SetCellInput i, j, .GetCurSheet, 1
				Next
			Next
		Else
			For i = StartCol To EndCol
				For j = StartRow To EndRow
				    .SetCellInput i, j, .GetCurSheet, 5
				Next
			Next
		End If
		.Invalidate
        End With
End Sub


'*****************************************************************
'**********      表格中的右键菜单
'*****************************************************************
Dim TotalMenu

'设置右键菜单
Public Sub CellWeb1_MenuStart( ByVal col, ByVal row, ByVal section)
With CellWeb1
    If section = 1 Then '鼠标在表格区内
        .AddPopMenu 1001, "剪切(&T)", 0
        .AddPopMenu 1002, "复制(&C)", 0
        .AddPopMenu 1003, "粘贴(&P)", 0
        .AddPopMenu 1004, "选择性粘贴(&S)...", 0
        .AddPopMenu 1000, "", 0
        .AddPopMenu 1005, "输入公式(&I)", 0
        .AddPopMenu 1006, "格式刷(&M)", 0
        .AddPopMenu 1000, "", 0
        .AddPopMenu 1007, "清除内容(&N)     Del", 0
        .AddPopMenu 1008, "清除公式(&L)", 0
        .AddPopMenu 1009, "清除全部(&A)", 0
        .AddPopMenu 1000, "", 0
        .AddPopMenu 1015, "行高(&H)...", 0     //孙敬行 2013-8-22
        .AddPopMenu 1022, "列宽(&W)...", 0     //孙敬行 2013-8-22
        .AddPopMenu 1037, "合并单元(&J)...", 0  //孙敬行 2013-8-22
        .AddPopMenu 1010, "单元属性(&C)...", 0
        .AddPopMenu 1011, "超级链接(&H)...", 0
    ElseIf section = 2 Then '鼠标在行标上
        .AddPopMenu 1001, "剪切(&T)", 0
        .AddPopMenu 1002, "复制(&C)", 0
        .AddPopMenu 1003, "粘贴(&P)", 0
        .AddPopMenu 1004, "选择性粘贴(&S)...", 0
        .AddPopMenu 1000, "", 1
        .AddPopMenu 1012, "插入表行(&I)", 0
        .AddPopMenu 1013, "删除表行(&D)", 0
        .AddPopMenu 1014, "追加表行(&A)", 0
        .AddPopMenu 1000, "", 0
        .AddPopMenu 1015, "行高(&H)...", 0
        .AddPopMenu 1016, "最适合行高(&B)", 0
        .AddPopMenu 1017, "隐藏(&N)", 0
        .AddPopMenu 1018, "取消隐藏(&U)", 0
    ElseIf section = 3 Then '鼠标在列标上
        .AddPopMenu 1001, "剪切(&T)", 0
        .AddPopMenu 1002, "复制(&C)", 0
        .AddPopMenu 1003, "粘贴(&P)", 0
        .AddPopMenu 1004, "选择性粘贴(&S)...", 0
        .AddPopMenu 1000, "", 0
        .AddPopMenu 1019, "插入表列(&I)", 0
        .AddPopMenu 1020, "删除表列(&D)", 0
        .AddPopMenu 1021, "追加表列(&A)", 0
        .AddPopMenu 1000, "", 0
        .AddPopMenu 1022, "列宽(&W)", 0
        .AddPopMenu 1023, "最适合列宽(&W)", 0
        .AddPopMenu 1024, "隐藏(&N)", 0
        .AddPopMenu 1025, "取消隐藏(&U)", 0
    ElseIf section = 4 Then '鼠标在左上角
    	.AddPopMenu 1001, "剪切(&T)", 0
        .AddPopMenu 1002, "复制(&C)", 0
        .AddPopMenu 1003, "粘贴(&P)", 0
        .AddPopMenu 1004, "选择性粘贴(&S)...", 0
        .AddPopMenu 1000, "", 0
        .AddPopMenu 1007, "清除内容(&N)     Del", 0
        .AddPopMenu 1008, "清除公式(&L)", 0
        .AddPopMenu 1009, "清除全部(&A)", 0
        .AddPopMenu 1000, "", 0
        .AddPopMenu 1010, "单元属性(&C)...", 0
        .AddPopMenu 1026, "表页尺寸(&S)", 0
        .AddPopMenu 1027, "表页另存为(&O)...", 0
    ElseIf section = 5 Then '鼠标在页签上
        '.AddPopMenu 1028, "插入表页(&I)...", 0
        '.AddPopMenu 1029, "删除表页(&D)...", 0
        '.AddPopMenu 1030, "追加表页(&A)...", 0
        '.AddPopMenu 1000, "", 0
        '.AddPopMenu 1031, "重命名(&R)...", 0
        '.AddPopMenu 1032, "表页排序(&S)...", 0
        '.AddPopMenu 1000, "", 0
        '.AddPopMenu 1026, "表页尺寸(&F)...", 0
        '.AddPopMenu 1027, "表页另存为(&O)...", 0
        'If .IsSheetProtect(.GetCurSheet) Then
            '.AddPopMenu 1033, "表页解锁(&L)...", 0
        'Else
            '.AddPopMenu 1033, "表页保护(&L)...", 0
        'End If
    ElseIf section = 6 Then '鼠标在页签的操作按扭上时
    	CurSheet = .GetCurSheet
    	TotalMenu = .GetTotalSheets
        For i = 1 To TotalMenu
            If i - 1 = CurSheet Then
                .AddPopMenu 1040 + i, .GetSheetLabel(i - 1), 8
            Else
                .AddPopMenu 1040 + i, .GetSheetLabel(i - 1), 0
            End If
        Next
    End If
End With
End Sub

'清除内容
Public Sub cmdClearContent_Click()
	CellWeb1.Clear 1
End Sub

'清除公式
Public Sub cmdClearFormula_Click()
	CellWeb1.Clear 2
End Sub

'清除全部
Public Sub cmdClearAll_Click()
	CellWeb1.Clear 32
End Sub






'右键菜单命令
Public Sub CellWeb1_MenuCommand(ByVal col, ByVal row, ByVal itemid)
    '单元格中的右键菜单
    With CellWeb1
        Select Case itemid
            Case 1001: mnuEditCut_Click				'剪切
            Case 1002: mnuEditCopy_Click			'复制
            Case 1003: mnuEditPaste_Click			'粘贴
            Case 1004: mnuEditPasteSpecial_Click		'选择性粘贴
            Case 1005: ReportJs.Base.mnuFormulaInput_click			'输入公式
            Case 1006: CellWeb1.FormatPainter			'格式刷
            Case 1007: cmdClearContent_Click			'清除内容
            Case 1008: cmdClearFormula_Click			'清除公式
            Case 1009: cmdClearAll_Click			'清除全部
            Case 1010: mnuFormatCellProperty_click		'单元格属性
            Case 1011: mnuEditHyperlink_Click			'超级链接
            Case 1037: ReportJs.Base.Formula_mergecell_click			'组合单元   //孙敬行
            '行标菜单
            Case 1012 cmdInsertRow_click			'插入表行
            Case 1013 cmdDeleteRow_click 			'删除行
            Case 1014 cmdAppendRow_click			'追加行
            Case 1015: mnuRowHeight_click			'行高
            Case 1016: mnuRowBestHeight_click			'最适合行高
            Case 1017: mnuRowHide_click				'隐藏行
            Case 1018: mnuRowUnhide_click			'取消隐藏行
            
            '列标菜单
            Case 1019 cmdInsertCol_click			'插入列
            Case 1020 cmdDeleteCol_click			'删除列
            Case 1021 cmdAppendCol_click			'追加列
            Case 1022: mnuColWidth_click			'列宽
            Case 1023: mnuColBestWidth_click			'最适合列宽
            Case 1024: mnuColHide_click				'隐藏列
            Case 1025: mnuColUnhide_click			'取消隐藏列
            
            
            '表页菜单
            Case 1026: mnuSheetSize_click			'表页尺寸
            Case 1027: mnuFileSheetSaveAs_click			'表页另存为
            Case 1028: .InsertSheet .GetCurSheet, 1		'插入表页
            Case 1029: .DeleteSheet .GetCurSheet, 1		'删除表页
            Case 1030: .InsertSheet .GetTotalSheets, 1		'追加表页
            Case 1031: mnuSheetRename_Click			'重命名页签
            Case 1032: mnuSheetSortStyle_click			'表页排序
            Case 1033: mnuSheetProptect_click			'表页保护
        End Select
    End With
    
    '鼠标在页签的操作按扭上的菜单
    For i = 1 To TotalMenu
        If itemid = 1040 + i Then
        	CellWeb1.SetCurSheet i - 1
        	Exit For
        End If
    Next
End Sub

'*****************************************************************
'**********      下拉列表框中的事件
'*****************************************************************
'设置显示比例
Public Sub changeViewScale( ByVal value )
	zoom = value/100.0
	CellWeb1.SetScreenScale CellWeb1.GetCurSheet, zoom
End Sub

'设置字体
Public Sub changeFontName( ByVal value )
    With CellWeb1
        .GetSelectRange StartCol, StartRow, EndCol, EndRow
        CurSheet = .GetCurSheet
        lFontName = .FindFontIndex( value, 1)
        For i = StartCol To EndCol
            For j = StartRow To EndRow
                .SetCellFont i, j, CurSheet, lFontName
            Next
        Next
        .Invalidate
    End With
End Sub

'设置字号
Public Sub changeFontSize( ByVal value )
    With CellWeb1
        .GetSelectRange StartCol, StartRow, EndCol, EndRow
        CurSheet = .GetCurSheet
        lFontSize = value
        For i = StartCol To EndCol
            For j = StartRow To EndRow
                .SetCellFontSize i, j, CurSheet, lFontSize
            Next
        Next
        .Invalidate
    End With

End Sub

'填充类型
Public Sub changeFillType( ByVal value )
	CellWeb1.Fill value
End Sub

'日期类型
Public Sub changeDateType( ByVal value )
    With CellWeb1
        .GetSelectRange StartCol, StartRow, EndCol, EndRow
        CurSheet = .GetCurSheet
        For i = StartCol To EndCol
            For j = StartRow To EndRow
                .SetCellDouble i, j, CurSheet, CSng(Now())
                .SetCellNumType i, j, CurSheet, 3
                .SetCellDateStyle i, j, CurSheet, value
            Next
        Next
    End With
	
End Sub

'时间类型
Public Sub changeTimeType( ByVal value )
    With CellWeb1
        .GetSelectRange StartCol, StartRow, EndCol, EndRow
        CurSheet = .GetCurSheet
        For i = StartCol To EndCol
            For j = StartRow To EndRow
                .SetCellDouble i, j, CurSheet, CSng(Now())
                .SetCellNumType i, j, CurSheet, 4
                .SetCellTimeStyle i, j, CurSheet, value
            Next
        Next
    End With
End Sub



