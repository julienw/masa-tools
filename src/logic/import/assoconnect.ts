import { parseStringPromise as parseString } from "xml2js";

export async function convertFromAssoconnectFormat(input: string) {
  const json = await parseString(input);
  const rows = json.Workbook.Worksheet[0].Table[0].Row.map((row: any) => {
    return row.Cell.map((cellData: any) => cellData.Data[0]._);
  });

  const header = rows[0];
  const values = rows.slice(1);
  const result = values.map((valueList: any) =>
    Object.fromEntries(
      valueList.map((value: any, i: number) => [header[i], value])
    )
  );

  return result;
}
