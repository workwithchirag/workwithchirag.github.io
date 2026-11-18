#!/usr/bin/env bash
# Converts the raw project media into small, web-ready files inside site/assets/.
# Run:  ./scripts/optimize-media.sh   (from anywhere)
# Raw files are read from SRC; web-ready files go to assets/.
# Needs: ffmpeg + cwebp  (brew install ffmpeg webp)
#
# To add a project: add lines at the bottom using img / vid / phonevid.
set -euo pipefail
SITE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${SRC:-/Users/donaldmethus/Sites/Project/st/portfolio}"
OUT="$SITE_DIR/assets"
cd "$SRC"

# img <slug> <out-name> <source.png>      -> site/assets/<slug>/<out-name>.webp (max 1800px wide)
img() {
  mkdir -p "$OUT/$1"
  local dst="$OUT/$1/$2.webp"
  [[ -f "$dst" && "$dst" -nt "$3" ]] && return 0
  local w; w=$(sips -g pixelWidth "$3" | awk '/pixelWidth/{print $2}')
  if (( w > 1800 )); then cwebp -quiet -q 82 -resize 1800 0 "$3" -o "$dst"
  else cwebp -quiet -q 82 "$3" -o "$dst"; fi
  echo "  img  $dst"
}

# phoneimg <slug> <out-name> <source.png> -> phone screenshot, max 900px wide
phoneimg() {
  mkdir -p "$OUT/$1"
  local dst="$OUT/$1/$2.webp"
  [[ -f "$dst" && "$dst" -nt "$3" ]] && return 0
  cwebp -quiet -q 82 -resize 900 0 "$3" -o "$dst"
  echo "  img  $dst"
}

# vid <slug> <out-name> <source>          -> desktop screen recording, max 1440px wide
vid() { _video "$1" "$2" "$3" "scale='min(1440,iw)':-2"; }
# phonevid <slug> <out-name> <source>     -> portrait phone recording, max 1280px tall
phonevid() { _video "$1" "$2" "$3" "scale=-2:'min(1280,ih)'"; }

_video() {
  mkdir -p "$OUT/$1"
  local dst="$OUT/$1/$2.mp4" poster="$OUT/$1/$2-poster.webp"
  if [[ ! -f "$dst" || "$3" -nt "$dst" ]]; then
    ffmpeg -loglevel error -y -i "$3" -vf "$4,fps=30" -c:v libx264 -preset slow -crf 26 \
      -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k "$dst"
    echo "  vid  $dst ($(du -h "$dst" | cut -f1))"
  fi
  if [[ ! -f "$poster" ]]; then
    ffmpeg -loglevel error -y -ss 2 -i "$dst" -frames:v 1 -f image2pipe -vcodec png - | cwebp -quiet -q 80 -o "$poster" -- -
  fi
}

echo "Relay"
S="AI Agents - relay/screenshots"
img relay cover "$S/01-cover.png"
vid relay demo "AI Agents - relay/video/relay-demo.mp4"
img relay 01 "$S/02-approval-email.png"
img relay 02 "$S/03-console-live-trace.png"
img relay 03 "$S/04-run-detail.png"
img relay 04 "$S/05-approvals-inbox.png"
img relay 05 "$S/06-dashboard.png"
img relay 06 "$S/07-contact-timeline.png"
img relay 07 "$S/08-deals-board.png"
img relay 08 "$S/09-workflow-editor.png"
img relay 09 "$S/10-tools.png"
img relay 10 "$S/11-dark-console.png"
img relay 11 "$S/12-mobile-approval.png"
img relay 12 "AI Agents - relay/architecture.png"

echo "SupportIQ"
S="supportIq"
img supportiq cover "$S/01_cover (1).png"
vid supportiq demo "$S/09_supportiq_demo_video.mp4"
img supportiq 01 "$S/02_widget_answer_with_sources.png"
img supportiq 02 "$S/03_widget_handoff.png"
img supportiq 03 "$S/04_playground_hybrid_search.png"
img supportiq 04 "$S/05_knowledge_base.png"
img supportiq 05 "$S/06_ticket_with_transcript.png"
img supportiq 06 "$S/07_content_gaps.png"
img supportiq 07 "$S/08_analytics_dashboard.png"

echo "ExtractIQ"
S="extractiq/screenshots"
img extractiq cover "$S/01-cover.png"
vid extractiq demo "extractiq/demo/extractiq-demo.mp4"
img extractiq 01 "$S/dashboard.png"
img extractiq 02 "$S/review.png"
img extractiq 03 "$S/matching.png"
img extractiq 04 "$S/documents.png"
img extractiq 05 "$S/analytics.png"
img extractiq 06 "$S/review-dark.png"
img extractiq 07 "$S/dashboard-dark.png"
img extractiq 08 "$S/settings.png"
img extractiq 09 "$S/mobile-review.png"

echo "BuildLead"
S="buildlead-crm/docs"
img buildlead cover "$S/screenshots/01_cover (2).png"
vid buildlead demo "$S/video/buildlead-demo.mp4"
img buildlead 01 "$S/screenshots/02_lead_detail_ai_score.png"
img buildlead 02 "$S/screenshots/06_dashboard.png"
img buildlead 03 "$S/screenshots/04_pipeline.png"
img buildlead 04 "$S/screenshots/03_leads_list.png"
img buildlead 05 "$S/screenshots/05_quote_builder.png"
img buildlead 06 "$S/screenshots/07_projects.png"
img buildlead 07 "$S/screenshots/08_invoices.png"
img buildlead 08 "$S/screenshots/09_command_palette.png"
img buildlead 09 "$S/screenshots/10_mobile_dashboard.png"
img buildlead 10 "$S/diagrams/architecture.png"

echo "LMS"
S="LMS Edtech"
img lms cover "$S/01_cover-1.png"
vid lms demo "$S/09_lms_walkthrough_video.mp4"
img lms 01 "$S/02_course_page.png"
img lms 02 "$S/03_membership_pricing.png"
img lms 03 "$S/04_lesson_player.png"
img lms 04 "$S/05_live_classes.png"
img lms 05 "$S/06_instructor_earnings.png"
img lms 06 "$S/07_admin_analytics.png"
img lms 07 "$S/08_admin_payments_refunds.png"

echo "Booking"
S="Booking app/New"
img booking cover "$S/01_cover.png"
phonevid booking demo "Booking app/Booking-process.mov"
img booking 01 "$S/02_mobile_book_a_service.png"
img booking 02 "$S/03_mobile_pick_a_slot.png"
img booking 03 "$S/04_mobile_confirm_booking.png"
img booking 04 "$S/05_mobile_my_bookings.png"
img booking 05 "$S/06_web_provider_dashboard.png"
img booking 06 "$S/07_web_approve_booking.png"

echo "Telemedicine"
S="Telemedia/new"
img telemed cover "$S/telemed_cover_1000x750.png"
phonevid telemed patient "Telemedia/Patient-app.webm"
phonevid telemed doctor "Telemedia/Doctor-app.webm"
img telemed 01 "$S/02_patient_doctor_profile.png"
img telemed 02 "$S/03_patient_book_appointment.png"
img telemed 03 "$S/04_patient_my_consultations.png"
img telemed 04 "$S/05_doctor_appointments.png"
img telemed 05 "$S/06_doctor_manage_schedule.png"
img telemed 06 "$S/07_doctor_appointment_prescription.png"

echo "Chat Marketplace"
S="Chat Marketing App/New"
img cma cover "$S/cma_cover_1000x750.png"
phonevid cma buyer "Chat Marketing App/CMA-buyer-app-video.mov"
phonevid cma seller "Chat Marketing App/CMA-seller-app-video.mov"
img cma 01 "$S/02_buyer_listing_detail.png"
img cma 02 "$S/03_buyer_stripe_checkout.png"
img cma 03 "$S/04_seller_create_listing.png"
img cma 04 "$S/05_seller_payouts.png"
img cma 05 "$S/06_admin_dashboard.png"

echo "Run or Stay"
S="runorstay"
F="$S/FireShot Capture"
img runorstay cover "$S/cover/runorstay_cover_2000x1400.png"
phoneimg runorstay 01 "$S/png/store-01.png"
phoneimg runorstay 02 "$S/png/store-02.png"
phoneimg runorstay 03 "$S/png/store-03.png"
phoneimg runorstay 04 "$S/png/store-04.png"
phoneimg runorstay 05 "$S/png/store-05.png"
img runorstay 06 "$F 090 - Home -- Run Or Stay - [runorstay.com].png"
img runorstay 07 "$F 091 - Home -- Run Or Stay - [runorstay.com].png"
img runorstay 08 "$F 092 - Home -- Run Or Stay - [runorstay.com].png"

echo "Shelbi Finance"
S="shelbifinance"
img shelbi cover "$S/shelbiapp_cover_1000x750 (1).png"
phoneimg shelbi 01 "$S/image_original.png"
phoneimg shelbi 02 "$S/image_original-9.png"
phoneimg shelbi 03 "$S/image_original-3.png"
phoneimg shelbi 04 "$S/image_original-4.png"
phoneimg shelbi 05 "$S/image_original-5.png"
phoneimg shelbi 06 "$S/image_original-6.png"
phoneimg shelbi 07 "$S/image_original-7.png"
img shelbi 08 "$S/image_original.jpg"

echo "Singles Game Night"
S="singlesgamenight"
F="$S/FireShot Capture"
img singlesgamenight cover "$S/cover/sgn_cover_2000x1400.png"
phoneimg singlesgamenight 01 "$S/unnamed.jpeg"
phoneimg singlesgamenight 02 "$S/unnamed (1).jpeg"
phoneimg singlesgamenight 03 "$S/unnamed (2).jpeg"
phoneimg singlesgamenight 04 "$S/unnamed (3).jpeg"
phoneimg singlesgamenight 05 "$S/unnamed (4).jpeg"
img singlesgamenight 06 "$F 093 - Single Game Night - [singlesgamenight.com].png"
img singlesgamenight 07 "$F 094 - Single Game Night - [singlesgamenight.com].png"
img singlesgamenight 08 "$F 095 - Single Game Night - [singlesgamenight.com].png"

echo "Done. Total: $(du -sh "$OUT" | cut -f1)"
