import React from "react";

class ExcelToJSON {
  parseExcel(
    file: File,
    fn: (sheetName: string, data: Record<any, any>[]) => void
  ) {
    var reader = new FileReader();

    reader.onload = function (e) {
      if (e === null || e.target == null) return;
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      workbook.SheetNames.forEach(function (sheetName: string) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        var json_object = JSON.stringify(XL_row_object);
        fn(sheetName, JSON.parse(json_object));
        // jQuery("#xlx_json").val(json_object);
      });
    };

    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  }
}

export const FileParserApp: React.FC<{
  onData: (sheetName: string, data: Record<any, any>[]) => void;
}> = ({ onData }) => {
  function handleFileSelect(evt: React.ChangeEvent<HTMLInputElement>) {
    var files = evt.target.files; // FileList object
    var xl2json = new ExcelToJSON();
    if (files === null) return;
    xl2json.parseExcel(files[0], onData);
  }

  return (
    <div>
      {/* input file to select only excel sheets
       */}
      <input
        type="file"
        id="files"
        name="files[]"
        onChange={handleFileSelect}
      />
    </div>
  );
};
