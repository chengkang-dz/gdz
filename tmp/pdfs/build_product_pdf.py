from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, PageBreak, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(r"C:\Users\Lenovo\Desktop\gdz")
OUTPUT = ROOT / "output" / "pdf" / "工位情绪回收站-产品说明.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

pdfmetrics.registerFont(TTFont("YaHei", r"C:\Windows\Fonts\msyh.ttc"))
pdfmetrics.registerFont(TTFont("SimHei", r"C:\Windows\Fonts\simhei.ttf"))

NAVY = colors.HexColor("#233B75")
INK = colors.HexColor("#20232A")
MUTED = colors.HexColor("#5F6570")
RULE = colors.HexColor("#D6DCE7")

styles = {
    "cover_kicker": ParagraphStyle(
        "cover_kicker", fontName="YaHei", fontSize=10, leading=15,
        textColor=NAVY, alignment=TA_CENTER, spaceAfter=12,
    ),
    "cover_title": ParagraphStyle(
        "cover_title", fontName="SimHei", fontSize=26, leading=33,
        textColor=INK, alignment=TA_CENTER, spaceAfter=8,
    ),
    "cover_subtitle": ParagraphStyle(
        "cover_subtitle", fontName="YaHei", fontSize=11, leading=16,
        textColor=MUTED, alignment=TA_CENTER, spaceAfter=10,
    ),
    "cover_link": ParagraphStyle(
        "cover_link", fontName="YaHei", fontSize=9.5, leading=15,
        textColor=NAVY, alignment=TA_CENTER, spaceAfter=35,
    ),
    "section": ParagraphStyle(
        "section", fontName="SimHei", fontSize=18, leading=25,
        textColor=INK, spaceAfter=9,
    ),
    "lead": ParagraphStyle(
        "lead", fontName="YaHei", fontSize=10.5, leading=17,
        textColor=MUTED, spaceAfter=17,
    ),
    "item": ParagraphStyle(
        "item", fontName="SimHei", fontSize=13, leading=20,
        textColor=INK, spaceBefore=17, spaceAfter=8,
    ),
    "body": ParagraphStyle(
        "body", fontName="YaHei", fontSize=10.5, leading=18,
        textColor=INK, spaceAfter=9, wordWrap="CJK",
    ),
    "point": ParagraphStyle(
        "point", fontName="YaHei", fontSize=10.5, leading=18,
        textColor=INK, leftIndent=16, firstLineIndent=-16,
        spaceAfter=8, wordWrap="CJK",
    ),
}


def p(text, style="body"):
    return Paragraph(text, styles[style])


def section(title, intro):
    return [p(title, "section"), HRFlowable(width="100%", thickness=1, color=RULE), Spacer(1, 15), p(intro, "lead")]


def item(number, title, text):
    return [p(f"{number}　{title}", "item"), p(text)]


story = [
    Spacer(1, 29),
    p("1024 ALL IN AI 鬼点子大赛 · 脑洞趣味", "cover_kicker"),
    p("工位情绪回收站", "cover_title"),
    p("产品介绍文档", "cover_subtitle"),
    p('<link href="https://chengkang-dz.github.io/gdz/" color="#233B75">在线体验：chengkang-dz.github.io/gdz/</link>', "cover_link"),
]
story += section("一、产品概述与目标用户", "用最简单的话说明作品是什么，以及主要给谁使用。")
story += item(1, "一句话介绍", "一款面向职场员工的趣味网页：把当天的小烦恼交给加班幽灵，用三种可视化方式处理，并生成可保存的“工位存活凭证”。")
story += item(2, "目标用户", "在开会、改稿、赶进度等工作间隙，想用几十秒转换心情的办公室员工；尤其适合喜欢轻量互动、愿意把有趣结果分享给同事的人。")

story.append(PageBreak())
story += section("二、使用场景、用户问题与解决方案", "把作品放到真实工作日里，看清它提供的体验。")
story += item(3, "使用场景", "午休前、刚结束一场会议或下班前，用户在电脑或手机上打开链接，写下“改了 8 版的 PPT”之类的小烦恼，选一种处理方式，看幽灵表演，带走一张存活凭证。")
story += item(4, "用户问题", "一些工作小事会让人短暂烦躁，却又不一定值得正式倾诉。发在群里可能打扰别人，独自记在备忘录里又缺少即时反馈。用户需要一个随手打开、没有使用门槛、能让烦恼被轻松“处理”一下的出口。")
story += item(5, "产品解决方案", "用户输入一句烦恼后，可选择“碎成像素”“发射到外太空”或“封进下班盒”。页面自动回到工位场景，播放对应动画与幽灵回应，随后生成写有烦恼、处理方式和批注的凭证。内容只在当前浏览器中处理，不上传，也不保存到浏览器存储。")

story.append(PageBreak())
story += section("三、核心功能与使用流程", "只列当前版本已经可以实际体验的内容。")
story.append(p("6　核心功能", "item"))
story += [
    p("1. 烦恼输入：支持自由填写，提供三条示例供快速体验。", "point"),
    p("2. 三种回收方式：像素碎裂、火箭升空、下班盒合盖，各有独立动画。", "point"),
    p("3. 幽灵反馈：处理时显示对应状态，完成后给出轻松吐槽文案。", "point"),
    p("4. 存活凭证：展示用户原文、处理方式、幽灵批注和日期，可保存为 PNG 图片。", "point"),
    p("5. 多端体验：同一网页可在电脑和手机浏览器使用，无需注册。", "point"),
]
story.append(p("7　使用流程", "item"))
story += [
    p("打开网页 → 输入烦恼或选择示例 → 选择回收方式并点击“开始情绪回收” → 观看幽灵动画 → 查看并保存工位存活凭证。", "body"),
]

story.append(PageBreak())
story += section("四、产品亮点与 AI 作用", "说明作品最容易被记住的地方，以及 AI 实际参与了什么。")
story.append(p("8　产品亮点", "item"))
story += [
    p("1. 把抽象的小烦恼变成屏幕上的“物件”，通过粉碎、发射、封存三个动作，形成一段完整又轻松的告别仪式。", "point"),
    p("2. 加班幽灵、夜间工位与复古像素风格构成统一故事场景；不同处理方式有不同演出和吐槽，适合在同事间试玩。", "point"),
    p("3. 输入过程无需账号或后端；用户自行决定是否保存并分享凭证。", "point"),
]
story.append(p("9　AI 在作品中的作用", "item"))
story.append(p("AI 参与了选题讨论、玩法与文案设计、网页代码生成，以及根据浏览器实际效果调整动画和手机布局。当前版本没有接入大模型接口：动画和幽灵批注由前端预设规则驱动，用户输入不会被发送给 AI 服务。"))


def draw_page(canvas, doc):
    canvas.saveState()
    width, height = letter
    canvas.setFillColor(MUTED)
    canvas.setFont("YaHei", 9)
    canvas.drawString(58, height - 43, "1024 ALL IN AI")
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.7)
    canvas.line(58, height - 51, width - 58, height - 51)
    canvas.line(58, 50, width - 58, 50)
    canvas.setFont("YaHei", 8.5)
    canvas.drawString(58, 34, "工位情绪回收站 · 产品介绍文档")
    canvas.drawRightString(width - 58, 34, f"{doc.page} / 4")
    canvas.restoreState()


doc = SimpleDocTemplate(
    str(OUTPUT), pagesize=letter,
    leftMargin=58, rightMargin=58, topMargin=72, bottomMargin=68,
    title="工位情绪回收站 - 产品介绍文档",
    author="1024 鬼点子计划",
)
doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)
print(OUTPUT)
