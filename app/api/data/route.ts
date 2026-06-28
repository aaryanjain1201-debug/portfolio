import { getSupabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({});

  try {
    const { data, error } = await supabase
      .from("portfolio_data")
      .select("data")
      .eq("id", "main")
      .single();

    if (error) return NextResponse.json({});
    return NextResponse.json(data?.data || {});
  } catch {
    return NextResponse.json({});
  }
}

export async function POST(request: Request) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();

    const { error } = await supabase
      .from("portfolio_data")
      .upsert({ id: "main", data: body }, { onConflict: "id" });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
