import { serverClient } from "@/lib/supabase/server";
import { DropForm } from "./drop-form";

export default async function DropPage() {
  const supabase = await serverClient();
  const { data } = await supabase.from("drop_settings").select("number,name,line,intro").eq("id", 1).single();
  return (
    <>
      <h1 className="font-display text-3xl font-normal text-bur">Drop text</h1>
      <p className="mt-1 text-[0.8125rem] text-ash">Shown at the top of the home page and the shop.</p>
      <DropForm initial={data ?? { number: "", name: "", line: "", intro: "" }} />
    </>
  );
}
