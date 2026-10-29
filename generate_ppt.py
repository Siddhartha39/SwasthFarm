import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    # 16:9 widescreen
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Color Palette: Clean, professional agri-tech & modern dark theme
    BG_DARK = RGBColor(11, 15, 25)         # #0B0F19 - Dark slate canvas
    CARD_BG = RGBColor(18, 25, 42)         # #12192A - Slightly elevated card
    CARD_BORDER = RGBColor(30, 41, 59)     # #1E293B - Slate border
    TEXT_WHITE = RGBColor(255, 255, 255)
    TEXT_MUTED = RGBColor(148, 163, 184)   # Slate 400
    TEXT_SUBTLE = RGBColor(100, 116, 139)  # Slate 500
    
    # Accent Colors
    ACCENT_GREEN = RGBColor(16, 185, 129)  # Emerald 500
    ACCENT_CYAN = RGBColor(6, 182, 212)    # Cyan 500
    ACCENT_PURPLE = RGBColor(168, 85, 247) # Purple 500
    ACCENT_AMBER = RGBColor(245, 158, 11)  # Amber 500
    ACCENT_ROSE = RGBColor(244, 63, 94)    # Rose 500

    def apply_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_DARK
        bg.line.fill.background()
        return bg

    def add_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=CARD_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        card.line.color.rgb = border_color
        card.line.width = Pt(1.2)
        return card

    def add_header(slide, title_text, category_text="AVINYA 2026 • SWASTHFARM"):
        # Category / Tag
        tx_cat = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.35))
        tf_cat = tx_cat.text_frame
        tf_cat.word_wrap = True
        tf_cat.margin_left = tf_cat.margin_right = tf_cat.margin_top = tf_cat.margin_bottom = 0
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.size = Pt(10)
        p_cat.font.bold = True
        p_cat.font.color.rgb = ACCENT_CYAN

        # Title
        tx_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(11.7), Inches(0.6))
        tf_title = tx_title.text_frame
        tf_title.word_wrap = True
        tf_title.margin_left = tf_title.margin_right = tf_title.margin_top = tf_title.margin_bottom = 0
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_WHITE

    # -------------------------------------------------------------
    # SLIDE 1: TITLE SLIDE (AVINYA 2026 TEMPLATE FORMAT)
    # -------------------------------------------------------------
    slide1 = prs.slides.add_slide(blank_layout)
    apply_bg(slide1)

    # Top Brand Bar
    add_card(slide1, Inches(0.8), Inches(0.8), Inches(11.733), Inches(1.0), RGBColor(15, 23, 42), ACCENT_CYAN)
    
    tb = slide1.shapes.add_textbox(Inches(1.1), Inches(0.95), Inches(3.5), Inches(0.7))
    tf = tb.text_frame
    p = tf.paragraphs[0]
    p.text = "AVINYA 2026"
    p.font.size = Pt(28)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GREEN

    # Top right meta
    tb_meta = slide1.shapes.add_textbox(Inches(5.0), Inches(0.95), Inches(7.2), Inches(0.7))
    tf_meta = tb_meta.text_frame
    p_meta = tf_meta.paragraphs[0]
    p_meta.text = "TEAM: ZEYOTECH   |   COLLEGE: PRANVEER SINGH INSTITUTE OF TECHNOLOGY (PSIT)"
    p_meta.font.size = Pt(12)
    p_meta.font.bold = True
    p_meta.font.color.rgb = TEXT_WHITE
    p_sub = tf_meta.add_paragraph()
    p_sub.text = "TEAM MEMBERS: Siddhartha Singh , Aviral Vishwakarma"
    p_sub.font.size = Pt(11)
    p_sub.font.color.rgb = ACCENT_CYAN

    # Main Hero Box
    add_card(slide1, Inches(0.8), Inches(2.1), Inches(11.733), Inches(4.6), CARD_BG, RGBColor(30, 41, 59))
    
    tb_hero = slide1.shapes.add_textbox(Inches(1.2), Inches(2.4), Inches(10.9), Inches(3.9))
    tf_hero = tb_hero.text_frame
    tf_hero.word_wrap = True

    p1 = tf_hero.paragraphs[0]
    p1.text = "PROJECT SWASTHFARM (स्वस्थफार्म) 2.0"
    p1.font.size = Pt(32)
    p1.font.bold = True
    p1.font.color.rgb = TEXT_WHITE

    p2 = tf_hero.add_paragraph()
    p2.text = "AI-Powered Multi-Animal Farm Management, Biosecurity & Statistical Analytics Platform"
    p2.font.size = Pt(16)
    p2.font.color.rgb = ACCENT_GREEN
    p2.space_before = Pt(8)

    p3 = tf_hero.add_paragraph()
    p3.text = "PROBLEM STATEMENT:"
    p3.font.size = Pt(13)
    p3.font.bold = True
    p3.font.color.rgb = ACCENT_CYAN
    p3.space_before = Pt(20)

    p4 = tf_hero.add_paragraph()
    p4.text = "“How can we transition smallholder and commercial livestock farming from reactive crisis response to proactive, data-driven health monitoring, early disease anomaly detection, and bilingual AI assistance to safeguard livestock productivity and farmer income?”"
    p4.font.size = Pt(14)
    p4.font.italic = True
    p4.font.color.rgb = RGBColor(226, 232, 240)
    p4.space_before = Pt(6)

    # 3 Pill Badges
    pills = [
        ("🐄 Multi-Species 360° Care", ACCENT_GREEN),
        ("📈 IQR & Z-Score Anomaly Engine", ACCENT_PURPLE),
        ("🤖 Bilingual Kisan Mitra RAG", ACCENT_CYAN),
    ]
    for idx, (pill_txt, pill_col) in enumerate(pills):
        px = Inches(1.2 + idx * 3.6)
        card_p = add_card(slide1, px, Inches(5.6), Inches(3.3), Inches(0.6), RGBColor(15, 23, 42), pill_col)
        tb_p = slide1.shapes.add_textbox(px, Inches(5.65), Inches(3.3), Inches(0.5))
        tf_p = tb_p.text_frame
        p_p = tf_p.paragraphs[0]
        p_p.text = pill_txt
        p_p.alignment = PP_ALIGN.CENTER
        p_p.font.size = Pt(11)
        p_p.font.bold = True
        p_p.font.color.rgb = TEXT_WHITE

    # -------------------------------------------------------------
    # SLIDE 2: PROBLEM STATEMENT
    # -------------------------------------------------------------
    slide2 = prs.slides.add_slide(blank_layout)
    apply_bg(slide2)
    add_header(slide2, "PROBLEM STATEMENT • CHALLENGES IN MODERN LIVESTOCK MANAGEMENT")

    problems = [
        ("Late Clinical Diagnosis & Massive Herd Loss", 
         "Farmers detect illnesses (such as Mastitis, FMD, or Brucellosis) only after severe physical symptoms or abrupt milk crashes occur, making treatment reactive, costly, and less effective."),
        ("No Early-Warning Statistical Analytics", 
         "Subclinical production yield drops (-15% to -20%) go completely unnoticed amid daily fluctuations because farmers lack rolling baselines (IQR and Z-score tests)."),
        ("Severe Climate & Heat Stress Vulnerability", 
         "High Temperature-Humidity Index (THI > 78) causes silent heat stress, reducing cattle lactation yield by up to 25% without automated environmental telemetry."),
        ("Fragile Rural Connectivity & Network Dead-Zones", 
         "Standard farm management software requires continuous high-speed 4G internet, failing catastrophically in rural remote cattle sheds with zero connectivity."),
        ("Unstructured Veterinary Records & Audit Gaps", 
         "Daily morning/evening milk yields, vaccination batches, feed intake, and drug withdrawal periods are logged on scattered paper diaries or lost completely."),
        ("Language & Knowledge Barrier for Farmers", 
         "Complex veterinary literature is inaccessible to rural Indian farmers who require instant, truthful advice in their native language (हिंदी & English) grounded in real farm data.")
    ]

    for idx, (head, desc) in enumerate(problems):
        col = idx % 2
        row = idx // 2
        x = Inches(0.8 + col * 5.95)
        y = Inches(1.5 + row * 1.55)
        
        add_card(slide2, x, y, Inches(5.75), Inches(1.4), CARD_BG, RGBColor(30, 41, 59))
        
        # Indicator badge
        b = slide2.shapes.add_shape(MSO_SHAPE.OVAL, x + Inches(0.25), y + Inches(0.25), Inches(0.25), Inches(0.25))
        b.fill.solid()
        b.fill.fore_color.rgb = ACCENT_ROSE
        b.line.fill.background()

        tb = slide2.shapes.add_textbox(x + Inches(0.65), y + Inches(0.15), Inches(4.9), Inches(1.15))
        tf = tb.text_frame
        tf.word_wrap = True
        p_h = tf.paragraphs[0]
        p_h.text = head
        p_h.font.size = Pt(13)
        p_h.font.bold = True
        p_h.font.color.rgb = TEXT_WHITE

        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = TEXT_MUTED
        p_d.space_before = Pt(3)

    # Core Driving Question Banner
    add_card(slide2, Inches(0.8), Inches(6.35), Inches(11.7), Inches(0.75), RGBColor(15, 23, 42), ACCENT_CYAN)
    tb_q = slide2.shapes.add_textbox(Inches(1.0), Inches(6.45), Inches(11.3), Inches(0.55))
    tf_q = tb_q.text_frame
    p_q = tf_q.paragraphs[0]
    p_q.text = "“How can we transition livestock management from reactive treatment to preventive, data-driven, and resource-aware stewardship?”"
    p_q.font.size = Pt(12)
    p_q.font.bold = True
    p_q.font.italic = True
    p_q.font.color.rgb = ACCENT_GREEN

    # -------------------------------------------------------------
    # SLIDE 3: SOLUTION & KEY FEATURES
    # -------------------------------------------------------------
    slide3 = prs.slides.add_slide(blank_layout)
    apply_bg(slide3)
    add_header(slide3, "SOLUTION OVERVIEW & CORE CAPABILITIES")

    # Solution statement
    add_card(slide3, Inches(0.8), Inches(1.45), Inches(11.7), Inches(1.15), RGBColor(15, 23, 42), ACCENT_GREEN)
    tb_sol = slide3.shapes.add_textbox(Inches(1.1), Inches(1.55), Inches(11.1), Inches(0.95))
    tf_sol = tb_sol.text_frame
    tf_sol.word_wrap = True
    p_s1 = tf_sol.paragraphs[0]
    p_s1.text = "SwasthFarm (स्वस्थफार्म) 2.0 is an AI-powered multi-animal farm management, biosecurity & statistical analytics platform that transitions livestock stewardship from reactive crisis treatment to proactive, data-driven resilience."
    p_s1.font.size = Pt(13)
    p_s1.font.bold = True
    p_s1.font.color.rgb = TEXT_WHITE
    p_s2 = tf_sol.add_paragraph()
    p_s2.text = "It combines offline-first local persistence, bidirectional cloud Firestore synchronization, rolling IQR anomaly detection, real-time THI heat stress intelligence, and Kisan Mitra domain-specific AI RAG in English and हिंदी."
    p_s2.font.size = Pt(11)
    p_s2.font.color.rgb = TEXT_MUTED
    p_s2.space_before = Pt(3)

    # 4 Key Pillars Cards
    pillars = [
        ("🐄 Multi-Species 360° Tracking", 
         "Unified profile across cattle, buffaloes, sheep, goats, poultry & swine. Logs daily morning/evening milk yield, butterfat %, ration DM kg, water intake, rectal temp °C, and vaccination lots.",
         ACCENT_CYAN),
        ("📈 Statistical Anomaly Engine", 
         "Calculates 30-day rolling baselines, Interquartile Range (IQR) & Z-score deviation. Automatically flags subclinical yield crashes (-18.2% drop) before visible clinical symptoms emerge.",
         ACCENT_PURPLE),
        ("🌤️ Weather & THI Heat Stress", 
         "Pulls district-level ambient temperature and humidity via OpenWeatherMap. Automatically computes NRC Temperature-Humidity Index (THI) with proactive heat stress mitigation alerts.",
         ACCENT_AMBER),
        ("🤖 Kisan Mitra AI Copilot (RAG)", 
         "Zero-hallucination domain RAG assistant answering financial and clinical queries ('Which month more profit?', 'Profit badhane ke liye kya kare?') with bilingual English & हिंदी NLP.",
         ACCENT_GREEN)
    ]

    for idx, (p_title, p_desc, p_col) in enumerate(pillars):
        x = Inches(0.8 + idx * 2.98)
        y = Inches(2.8)
        add_card(slide3, x, y, Inches(2.8), Inches(4.3), CARD_BG, p_col)
        
        # Pill Header
        tb_p = slide3.shapes.add_textbox(x + Inches(0.15), y + Inches(0.2), Inches(2.5), Inches(1.0))
        tf_p = tb_p.text_frame
        tf_p.word_wrap = True
        p_pt = tf_p.paragraphs[0]
        p_pt.text = p_title
        p_pt.font.size = Pt(13)
        p_pt.font.bold = True
        p_pt.font.color.rgb = p_col

        # Desc
        tb_pd = slide3.shapes.add_textbox(x + Inches(0.15), y + Inches(1.2), Inches(2.5), Inches(3.0))
        tf_pd = tb_pd.text_frame
        tf_pd.word_wrap = True
        p_pdesc = tf_pd.paragraphs[0]
        p_pdesc.text = p_desc
        p_pdesc.font.size = Pt(10.5)
        p_pdesc.font.color.rgb = TEXT_MUTED

    # -------------------------------------------------------------
    # SLIDE 4: END-TO-END FLOW OF SOLUTION
    # -------------------------------------------------------------
    slide4 = prs.slides.add_slide(blank_layout)
    apply_bg(slide4)
    add_header(slide4, "FLOW OF SOLUTION • CONTINUOUS OPERATIONAL LIFECYCLE")

    steps = [
        ("1. Data Ingestion", "Farmer & Vet PWA logs morning/evening milk yields, feed DM (kg), and rectal temperature °C.", ACCENT_CYAN),
        ("2. Offline Snapshot", "Instant local persistence in LocalStorage (`swasth_farm_data_v2`) guarantees 100% offline shed operation.", ACCENT_AMBER),
        ("3. Cloud Sync", "Firestore Sync Service commits bidirectional document batches to Cloud Firestore whenever connected.", ACCENT_GREEN),
        ("4. Anomaly Test", "Statistical engine evaluates rolling 30d baseline using IQR & Z-score, flagging -18.2% subclinical yield drops.", ACCENT_PURPLE),
        ("5. Priority Alert", "System auto-elevates animal status to Attention and generates urgent notifications on Executive Dashboard.", ACCENT_ROSE),
        ("6. Kisan Mitra AI", "Farmer inquires in Hindi/English; Domain RAG retrieves verified farm telemetry & delivers recovery steps.", ACCENT_CYAN)
    ]

    for idx, (s_title, s_desc, s_color) in enumerate(steps):
        col = idx % 3
        row = idx // 3
        x = Inches(0.8 + col * 3.98)
        y = Inches(1.6 + row * 2.5)
        
        add_card(slide4, x, y, Inches(3.78), Inches(2.2), CARD_BG, RGBColor(30, 41, 59))
        
        # Step Number Badge
        badge = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x + Inches(0.2), y + Inches(0.2), Inches(0.45), Inches(0.35))
        badge.fill.solid()
        badge.fill.fore_color.rgb = s_color
        badge.line.fill.background()
        tf_b = badge.text_frame
        p_b = tf_b.paragraphs[0]
        p_b.text = str(idx + 1)
        p_b.alignment = PP_ALIGN.CENTER
        p_b.font.size = Pt(11)
        p_b.font.bold = True
        p_b.font.color.rgb = RGBColor(11, 15, 25)

        tb_s = slide4.shapes.add_textbox(x + Inches(0.75), y + Inches(0.18), Inches(2.8), Inches(0.45))
        tf_s = tb_s.text_frame
        p_st = tf_s.paragraphs[0]
        p_st.text = s_title
        p_st.font.size = Pt(12)
        p_st.font.bold = True
        p_st.font.color.rgb = TEXT_WHITE

        tb_sd = slide4.shapes.add_textbox(x + Inches(0.2), y + Inches(0.7), Inches(3.4), Inches(1.35))
        tf_sd = tb_sd.text_frame
        tf_sd.word_wrap = True
        p_sd = tf_sd.paragraphs[0]
        p_sd.text = s_desc
        p_sd.font.size = Pt(10.5)
        p_sd.font.color.rgb = TEXT_MUTED

    # Flow ribbon
    add_card(slide4, Inches(0.8), Inches(6.5), Inches(11.7), Inches(0.65), RGBColor(15, 23, 42), ACCENT_GREEN)
    tb_rib = slide4.shapes.add_textbox(Inches(1.0), Inches(6.55), Inches(11.3), Inches(0.5))
    tf_rib = tb_rib.text_frame
    p_rib = tf_rib.paragraphs[0]
    p_rib.text = "FIELD ENTRY  ➔  LOCAL SNAPSHOT  ➔  FIRESTORE SYNC  ➔  IQR DETECTION  ➔  DASHBOARD ALERT  ➔  KISAN MITRA RAG"
    p_rib.font.size = Pt(11)
    p_rib.font.bold = True
    p_rib.font.color.rgb = ACCENT_GREEN
    p_rib.alignment = PP_ALIGN.CENTER

    # -------------------------------------------------------------
    # SLIDE 5: SYSTEM ARCHITECTURE & TECH STACK
    # -------------------------------------------------------------
    slide5 = prs.slides.add_slide(blank_layout)
    apply_bg(slide5)
    add_header(slide5, "SYSTEM ARCHITECTURE & PRODUCTION TECH STACK")

    tech_tiers = [
        ("Presentation / Client Layer", 
         "React 18 + Vite 5 (TypeScript)\nTailwind CSS, Lucide React Icons\nRecharts (Area, Bar, Dual-Axis Yield)\nBilingual Localization Engine (EN / HI)", 
         ACCENT_CYAN),
        ("State & Offline Persistence", 
         "FarmContext & AuthContext Coordinator\nLocalStorage Snapshot (`swasth_farm_data_v2`)\nZero-connectivity offline mutation queue\nBiometric/OTP session restoration", 
         ACCENT_AMBER),
        ("Cloud Database & Sync", 
         "Google Cloud Firestore SDK v10 (TLS 1.3)\nBidirectional onSnapshot WebSocket sync\nAtomic document batches & multi-tenant rules\nIndexed sub-collections for historical audits", 
         ACCENT_GREEN),
        ("Analytics Microservice & ML", 
         "Python 3.11 + FastAPI High-Throughput Worker\nNumPy, SciPy & Pandas Time-Series\nIQR Outlier & Z-Score Deviation Algorithms\n5-day Yield & ADG Regression Models", 
         ACCENT_PURPLE),
        ("Environmental Telemetry", 
         "OpenWeatherMap Geocoded API\nNRC Livestock Thermal Index Engine\nTHI = (1.8*T + 32) - ((0.55 - 0.0055*RH)*(1.8*T - 26))\nHeat stress threshold alerts (>78 THI)", 
         ACCENT_CYAN),
        ("Kisan Mitra AI RAG Engine", 
         "Domain-Specific RAG Knowledge Retrieval\nDeterministic In-Memory Grounding Synthesizer\nZero-Hallucination Veterinary & Financial Logic\nFull Natural Language Processing in हिंदी/EN", 
         ACCENT_GREEN)
    ]

    for idx, (t_title, t_desc, t_color) in enumerate(tech_tiers):
        col = idx % 3
        row = idx // 3
        x = Inches(0.8 + col * 3.98)
        y = Inches(1.6 + row * 2.5)

        add_card(slide5, x, y, Inches(3.78), Inches(2.2), CARD_BG, t_color)

        tb_t = slide5.shapes.add_textbox(x + Inches(0.2), y + Inches(0.2), Inches(3.4), Inches(0.45))
        tf_t = tb_t.text_frame
        p_tt = tf_t.paragraphs[0]
        p_tt.text = t_title
        p_tt.font.size = Pt(12)
        p_tt.font.bold = True
        p_tt.font.color.rgb = t_color

        tb_td = slide5.shapes.add_textbox(x + Inches(0.2), y + Inches(0.65), Inches(3.4), Inches(1.4))
        tf_td = tb_td.text_frame
        tf_td.word_wrap = True
        p_td = tf_td.paragraphs[0]
        p_td.text = t_desc
        p_td.font.size = Pt(10)
        p_td.font.color.rgb = TEXT_MUTED

    # Bottom badge
    add_card(slide5, Inches(0.8), Inches(6.5), Inches(11.7), Inches(0.65), RGBColor(15, 23, 42), ACCENT_PURPLE)
    tb_b = slide5.shapes.add_textbox(Inches(1.0), Inches(6.55), Inches(11.3), Inches(0.5))
    tf_b = tb_b.text_frame
    p_b = tf_b.paragraphs[0]
    p_b.text = "ARCHITECTURE SPECIFICATION: Conforms to Archify v2.17 Standards • In-App Interactive Topology & Camera Glide"
    p_b.font.size = Pt(11)
    p_b.font.bold = True
    p_b.font.color.rgb = ACCENT_PURPLE
    p_b.alignment = PP_ALIGN.CENTER

    # -------------------------------------------------------------
    # SLIDE 6: UNIQUE SELLING PROPOSITION (USP)
    # -------------------------------------------------------------
    slide6 = prs.slides.add_slide(blank_layout)
    apply_bg(slide6)
    add_header(slide6, "UNIQUE SELLING PROPOSITIONS (USP)")

    usps = [
        ("📈 Subclinical Anomaly Engine", 
         "Detects yield crashes (-18.2%) before physical symptoms appear using statistical IQR & Z-score tests against individual 30-day baselines.",
         "IQR & Z-Score Tests",
         ACCENT_PURPLE),
        ("🤖 Zero-Hallucination Farm RAG", 
         "Kisan Mitra queries live herd production records and feed expenses directly, accurately answering 'Which month more profit?' and 'Profit badhane ke liye kya kare?'.",
         "Truthful Bilingual RAG",
         ACCENT_CYAN),
        ("🛡️ 15-Point Biosecurity Protocol", 
         "Standardized preventive checklist covering tire dip, footbaths, quarantine, and perimeter control to issue certified farm biosecurity ratings (0–100).",
         "Preventive Certification",
         ACCENT_GREEN),
        ("💾 Offline-First Rural Resilience", 
         "Full operation in remote cattle sheds without internet using LocalStorage snapshots; seamlessly auto-synchronizes with Cloud Firestore when reconnected.",
         "Zero Network Loss",
         ACCENT_AMBER)
    ]

    for idx, (u_title, u_desc, u_badge, u_col) in enumerate(usps):
        x = Inches(0.8 + idx * 2.98)
        y = Inches(1.6)
        add_card(slide6, x, y, Inches(2.8), Inches(4.3), CARD_BG, u_col)

        # Badge
        badge = add_card(slide6, x + Inches(0.2), y + Inches(0.25), Inches(2.4), Inches(0.4), RGBColor(15, 23, 42), u_col)
        tb_b = slide6.shapes.add_textbox(x + Inches(0.2), y + Inches(0.25), Inches(2.4), Inches(0.4))
        tf_b = tb_b.text_frame
        p_b = tf_b.paragraphs[0]
        p_b.text = u_badge
        p_b.alignment = PP_ALIGN.CENTER
        p_b.font.size = Pt(9.5)
        p_b.font.bold = True
        p_b.font.color.rgb = u_col

        # Title
        tb_ut = slide6.shapes.add_textbox(x + Inches(0.15), y + Inches(0.85), Inches(2.5), Inches(0.9))
        tf_ut = tb_ut.text_frame
        tf_ut.word_wrap = True
        p_ut = tf_ut.paragraphs[0]
        p_ut.text = u_title
        p_ut.font.size = Pt(13)
        p_ut.font.bold = True
        p_ut.font.color.rgb = TEXT_WHITE

        # Desc
        tb_ud = slide6.shapes.add_textbox(x + Inches(0.15), y + Inches(1.85), Inches(2.5), Inches(2.3))
        tf_ud = tb_ud.text_frame
        tf_ud.word_wrap = True
        p_ud = tf_ud.paragraphs[0]
        p_ud.text = u_desc
        p_ud.font.size = Pt(10.5)
        p_ud.font.color.rgb = TEXT_MUTED

    # Core Motto Banner
    add_card(slide6, Inches(0.8), Inches(6.15), Inches(11.7), Inches(0.95), RGBColor(15, 23, 42), ACCENT_GREEN)
    tb_motto = slide6.shapes.add_textbox(Inches(1.0), Inches(6.25), Inches(11.3), Inches(0.75))
    tf_motto = tb_motto.text_frame
    p_m1 = tf_motto.paragraphs[0]
    p_m1.text = "“Healthy Animals. Efficient Resources. Sustainable Livestock.”"
    p_m1.font.size = Pt(13)
    p_m1.font.bold = True
    p_m1.font.color.rgb = ACCENT_GREEN
    p_m1.alignment = PP_ALIGN.CENTER
    p_m2 = tf_motto.add_paragraph()
    p_m2.text = "“स्वस्थ पशुधन, कुशल संसाधन, समृद्ध किसान।”"
    p_m2.font.size = Pt(12)
    p_m2.font.color.rgb = TEXT_WHITE
    p_m2.alignment = PP_ALIGN.CENTER

    # -------------------------------------------------------------
    # SLIDE 7: FEASIBILITY & COMPETITOR COMPARISON
    # -------------------------------------------------------------
    slide7 = prs.slides.add_slide(blank_layout)
    apply_bg(slide7)
    add_header(slide7, "COMPETITIVE MATRIX & FEASIBILITY ANALYSIS")

    # Table
    rows = 6
    cols = 6
    left = Inches(0.8)
    top = Inches(1.6)
    width = Inches(11.7)
    height = Inches(4.3)

    table_shape = slide7.shapes.add_table(rows, cols, left, top, width, height)
    table = table_shape.table

    # Column widths
    table.columns[0].width = Inches(2.7)
    table.columns[1].width = Inches(1.8)
    table.columns[2].width = Inches(1.8)
    table.columns[3].width = Inches(1.8)
    table.columns[4].width = Inches(1.8)
    table.columns[5].width = Inches(1.8)

    headers = [
        "Platform / Solution", 
        "Multi-Species 360°", 
        "IQR Anomaly Detection", 
        "THI Heat Stress", 
        "Offline-First", 
        "Bilingual AI RAG"
    ]
    
    for c_idx, h_text in enumerate(headers):
        cell = table.cell(0, c_idx)
        cell.fill.solid()
        cell.fill.fore_color.rgb = RGBColor(15, 23, 42)
        p = cell.text_frame.paragraphs[0]
        p.text = h_text
        p.alignment = PP_ALIGN.CENTER
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = ACCENT_CYAN

    matrix_data = [
        ("Traditional Paper Records", "❌ Scattered", "❌ None", "❌ None", "✅ Manual", "❌ None"),
        ("Generic Dairy Software", "⚠️ Cow-only", "❌ None", "❌ None", "❌ Needs 4G", "❌ None"),
        ("IoT Neck Collar Trackers", "⚠️ Cattle only", "⚠️ Proprietary", "❌ None", "❌ Cloud only", "❌ None"),
        ("Govt Livestock Portals", "✅ Registry", "❌ None", "❌ None", "❌ Online only", "❌ None"),
        ("SwasthFarm 2.0 (Ours)", "✅ 6 Species", "✅ IQR & Z-Score", "✅ Live NRC", "✅ 100% Offline", "✅ Hindi & English")
    ]

    for r_idx, row_values in enumerate(matrix_data):
        is_ours = (r_idx == len(matrix_data) - 1)
        bg = RGBColor(22, 36, 60) if is_ours else CARD_BG
        
        for c_idx, val in enumerate(row_values):
            cell = table.cell(r_idx + 1, c_idx)
            cell.fill.solid()
            cell.fill.fore_color.rgb = bg
            p = cell.text_frame.paragraphs[0]
            p.text = val
            p.alignment = PP_ALIGN.LEFT if c_idx == 0 else PP_ALIGN.CENTER
            p.font.size = Pt(10.5)
            if is_ours:
                p.font.bold = True
                p.font.color.rgb = ACCENT_GREEN if c_idx > 0 else TEXT_WHITE
            else:
                p.font.color.rgb = TEXT_WHITE if c_idx == 0 else TEXT_MUTED

    # Feasibility note
    add_card(slide7, Inches(0.8), Inches(6.15), Inches(11.7), Inches(0.9), RGBColor(15, 23, 42), ACCENT_PURPLE)
    tb_fn = slide7.shapes.add_textbox(Inches(1.0), Inches(6.25), Inches(11.3), Inches(0.7))
    tf_fn = tb_fn.text_frame
    tf_fn.word_wrap = True
    p_fn = tf_fn.paragraphs[0]
    p_fn.text = "FEASIBILITY & DEPLOYABILITY: Built entirely on lightweight web standards (React 18 + LocalStorage + Firebase Firestore) requiring zero expensive sensor hardware to start. Can run immediately on any $80 Android smartphone across rural cooperatives."
    p_fn.font.size = Pt(10.5)
    p_fn.font.color.rgb = RGBColor(226, 232, 240)

    # -------------------------------------------------------------
    # SLIDE 8: LIMITATIONS & ROADMAP (FUTURE WORK)
    # -------------------------------------------------------------
    slide8 = prs.slides.add_slide(blank_layout)
    apply_bg(slide8)
    add_header(slide8, "KNOWN LIMITATIONS & FUTURE ROADMAP")

    # Left Box: Limitations
    add_card(slide8, Inches(0.8), Inches(1.5), Inches(5.75), Inches(5.4), CARD_BG, RGBColor(30, 41, 59))
    tb_lim_h = slide8.shapes.add_textbox(Inches(1.1), Inches(1.7), Inches(5.1), Inches(0.45))
    tf_lim_h = tb_lim_h.text_frame
    p_lh = tf_lim_h.paragraphs[0]
    p_lh.text = "⚠️ KNOWN CURRENT LIMITATIONS"
    p_lh.font.size = Pt(14)
    p_lh.font.bold = True
    p_lh.font.color.rgb = ACCENT_ROSE

    limits = [
        "Manual Logging Dependency: Yield & rectal temperature still require manual entry or Bluetooth digital thermometer input.",
        "Short Baseline Heuristics: Animals with under 7 days of production records rely on bootstrap herd averages instead of statistical IQR.",
        "Clinical AI Disclaimer: System indicates subclinical statistical risk but never dispenses prescription veterinary drugs (DVM supervision mandatory).",
        "Weather Proximity: THI calculates from district-level meteorological stations; microclimate inside enclosed barns requires local ESP32 sensors."
    ]
    for idx, lim in enumerate(limits):
        tb_l = slide8.shapes.add_textbox(Inches(1.1), Inches(2.3 + idx * 1.05), Inches(5.1), Inches(0.95))
        tf_l = tb_l.text_frame
        tf_l.word_wrap = True
        p_l = tf_l.paragraphs[0]
        p_l.text = f"• {lim}"
        p_l.font.size = Pt(10.5)
        p_l.font.color.rgb = TEXT_MUTED

    # Right Box: Roadmap
    add_card(slide8, Inches(6.75), Inches(1.5), Inches(5.75), Inches(5.4), CARD_BG, RGBColor(30, 41, 59))
    tb_rd_h = slide8.shapes.add_textbox(Inches(7.05), Inches(1.7), Inches(5.1), Inches(0.45))
    tf_rd_h = tb_rd_h.text_frame
    p_rh = tf_rd_h.paragraphs[0]
    p_rh.text = "🚀 FUTURE ROADMAP (PLANNED WORK)"
    p_rh.font.size = Pt(14)
    p_rh.font.bold = True
    p_rh.font.color.rgb = ACCENT_CYAN

    roadmap = [
        "IoT ESP32 Smart-Barn Sensors: Low-cost ambient shed telemetry (temperature, humidity, ammonia NH₃, and methane CH₄ detection).",
        "Computer Vision Body Condition Scoring (BCS): Smartphone camera scan of cattle rump and spine to compute BCS (1–5) and fat mobilization.",
        "Direct Cooperative Milk-Chilling Integration: Automated API connection with Amul, Mother Dairy & regional bulk milk chillers (BMC).",
        "Voice-First Hindi Interface: Whisper AI speech-to-text allowing illiterate farmers to log milk and vitals by simply speaking into the phone."
    ]
    for idx, rd in enumerate(roadmap):
        tb_r = slide8.shapes.add_textbox(Inches(7.05), Inches(2.3 + idx * 1.05), Inches(5.1), Inches(0.95))
        tf_r = tb_r.text_frame
        tf_r.word_wrap = True
        p_r = tf_r.paragraphs[0]
        p_r.text = f"• {rd}"
        p_r.font.size = Pt(10.5)
        p_r.font.color.rgb = TEXT_MUTED

    # -------------------------------------------------------------
    # SLIDE 9: RESEARCH FOUNDATION & PROJECT REFERENCES
    # -------------------------------------------------------------
    slide9 = prs.slides.add_slide(blank_layout)
    apply_bg(slide9)
    add_header(slide9, "RESEARCH FOUNDATION & TECHNICAL REFERENCES")

    # Links Box
    add_card(slide9, Inches(0.8), Inches(1.5), Inches(11.7), Inches(1.4), RGBColor(15, 23, 42), ACCENT_CYAN)
    tb_lk = slide9.shapes.add_textbox(Inches(1.1), Inches(1.65), Inches(11.1), Inches(1.1))
    tf_lk = tb_lk.text_frame
    tf_lk.word_wrap = True
    
    p_l1 = tf_lk.paragraphs[0]
    p_l1.text = "PROJECT SWASTHFARM (LIVESTOCK X) 2.0 • LIVE REPOSITORY & DEPLOYMENT"
    p_l1.font.size = Pt(13)
    p_l1.font.bold = True
    p_l1.font.color.rgb = ACCENT_CYAN

    p_l2 = tf_lk.add_paragraph()
    p_l2.text = "GitHub Repository: https://github.com/Siddhartha39/SwasthFarm.git"
    p_l2.font.size = Pt(11)
    p_l2.font.color.rgb = TEXT_WHITE
    p_l2.space_before = Pt(4)

    p_l3 = tf_lk.add_paragraph()
    p_l3.text = "Architecture Spec: https://github.com/Siddhartha39/SwasthFarm/blob/main/ARCHITECTURE.md"
    p_l3.font.size = Pt(11)
    p_l3.font.color.rgb = ACCENT_GREEN

    # 4 Quadrants of Research Foundations
    quads = [
        ("🤖 AI & Grounded RAG", 
         "• Domain-specific retrieval augmentation\n• Deterministic schema grounding\n• Bilingual semantic prompt formulation\n• Strict veterinary hallucination shields",
         ACCENT_CYAN),
        ("📈 Statistical Intelligence", 
         "• Tukey's Interquartile Range (IQR) outliers\n• Z-score standard deviation thresholds\n• 30-day rolling baseline moving averages\n• 5-day regression yield forecasting",
         ACCENT_PURPLE),
        ("🩺 Veterinary Clinical Standards", 
         "• NRC Temperature-Humidity Index (THI)\n• Species physiological rectal baselines\n• WHO / FAO 15-point biosecurity standards\n• Subclinical mastitis early indicators",
         ACCENT_ROSE),
        ("💾 Distributed Cloud & Offline", 
         "• Google Cloud Firestore NoSQL SDK v10\n• WebSocket bidirectional listeners\n• HTML5 LocalStorage resilient snapshots\n• Offline queue with transactional sync",
         ACCENT_AMBER)
    ]

    for idx, (q_title, q_desc, q_col) in enumerate(quads):
        col = idx % 2
        row = idx // 2
        x = Inches(0.8 + col * 5.95)
        y = Inches(3.1 + row * 1.95)

        add_card(slide9, x, y, Inches(5.75), Inches(1.8), CARD_BG, q_col)

        tb_q = slide9.shapes.add_textbox(x + Inches(0.2), y + Inches(0.15), Inches(5.35), Inches(0.4))
        tf_q = tb_q.text_frame
        p_qt = tf_q.paragraphs[0]
        p_qt.text = q_title
        p_qt.font.size = Pt(12)
        p_qt.font.bold = True
        p_qt.font.color.rgb = q_col

        tb_qd = slide9.shapes.add_textbox(x + Inches(0.2), y + Inches(0.55), Inches(5.35), Inches(1.15))
        tf_qd = tb_qd.text_frame
        tf_qd.word_wrap = True
        p_qd = tf_qd.paragraphs[0]
        p_qd.text = q_desc
        p_qd.font.size = Pt(10)
        p_qd.font.color.rgb = TEXT_MUTED

    # Bottom team footer
    add_card(slide9, Inches(0.8), Inches(6.8), Inches(11.7), Inches(0.55), RGBColor(15, 23, 42), RGBColor(30, 41, 59))
    tb_foot = slide9.shapes.add_textbox(Inches(1.0), Inches(6.85), Inches(11.3), Inches(0.45))
    tf_foot = tb_foot.text_frame
    p_ft = tf_foot.paragraphs[0]
    p_ft.text = "AVINYA 2026 • TEAM ZEYOTECH (Siddhartha Singh , Aviral Vishwakarma) • PRANVEER SINGH INSTITUTE OF TECHNOLOGY"
    p_ft.font.size = Pt(10)
    p_ft.font.color.rgb = TEXT_SUBTLE
    p_ft.alignment = PP_ALIGN.CENTER

    output_path = "/Users/siddhartha/Desktop/aad/projects/Livestock X/SwasthFarm_Avinya_2026.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    create_presentation()
