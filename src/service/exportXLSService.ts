import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { UserRoleAssignmentExportDto } from "../entity/dto/UserRoleAssignmentExportDto.ts";

const exportToExcel = (
  records: UserRoleAssignmentExportDto[],
  fileName: string,
) => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(records);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const data = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(data, fileName + ".xlsx");
};

const ExcelService = {
  exportToExcel,
};

export default ExcelService;
