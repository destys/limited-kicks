import { NextRequest, NextResponse } from "next/server";

const BASE_FEED_URL = "https://limited-kicks.ru/admin/wp-content/uploads/";
const REPLACE_FROM = "https://limited-kicks.ru/admin";
const REPLACE_TO = "https://limited-kicks.ru";

// Заменяем потенциально опасные символы
function sanitizeXmlEntities(xml: string): string {
  return xml
    .replace(/&lsaquo;/g, "‹")
    .replace(/&rsaquo;/g, "›")
    .replace(/&nbsp;/g, " ")
    .replace(/&copy;/g, "(c)")
    .replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "&amp;");
}

// Исправляем незакрытые теги
function fixSelfClosingTags(xml: string): string {
  return xml
    .replace(/<input([^>]*)>/gi, "<input$1 />")
    .replace(/<br([^>]*)>/gi, "<br$1 />")
    .replace(/<img([^>]*)>/gi, "<img$1 />");
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  console.log('slug: ', slug);

  if (!slug) {
    return new NextResponse("Missing slug", { status: 400 });
  }

  const feedUrl = `${BASE_FEED_URL}${slug[0]}`;
  console.log('feedUrl: ', feedUrl);

  try {
    const res = await fetch(feedUrl);

    let xml = await res.text();

    // Преобразования
    xml = xml.replaceAll(REPLACE_FROM, REPLACE_TO);
    xml = fixSelfClosingTags(xml);
    xml = sanitizeXmlEntities(xml);

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (err) {
    console.error("Feed proxy error:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
