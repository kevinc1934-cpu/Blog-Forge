import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "memory-graph.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "No graph snapshot found" }, { status: 404 });
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json(JSON.parse(data), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
