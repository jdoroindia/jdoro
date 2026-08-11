/**
 * The house microcopy library.
 *
 * Every button, empty state and error message in one place, so the voice never
 * slips between pages. Rules we hold to:
 *   1. Say what happens next, not what the user should feel.
 *   2. Name the reason. "Sold out" means the fabric ran out — so say that.
 *   3. Plain words over trade words. We say "fabric", not "cloth"; a customer
 *      should never have to decode the industry to buy a coat.
 *   3. No exclamation marks. No apologies that explain nothing.
 */

/**
 * Two ways to buy the same piece, and the copy has to keep them straight:
 *   READY   — already cut from the run, boxed, leaves in two working days.
 *   MEASURE — cut for you from what is left of the same fabric, in 3–5 weeks.
 * Anything named *Ready or *Measure belongs to one of those two paths.
 */
export const ways = {
  readyLabel: "Ready to ship",
  readyLine: "Cut, finished and waiting. Dispatched within two working days.",
  measureLabel: "Cut to your measure",
  measureLine:
    "Cut from what is left of the same fabric, to your measurements. Three to five weeks.",
  chooseHeading: "How would you like it made?",
  chooseNote:
    "Same fabric, same hands, same price. The only difference is whether it already exists.",
} as const;

export const buttons = {
  /* Commerce */
  addToBag: "Add to bag",
  addToBagMadeToOrder: "Cut this to my measure",
  reserveCloth: "Reserve this fabric",
  chooseSize: "Choose a size",
  chooseSizeFirst: "Select a size to continue",
  viewBag: "View bag",
  checkout: "Continue to checkout",
  continueShopping: "Return to the collection",
  applyCode: "Apply",
  removeItem: "Remove",
  updateQuantity: "Update",
  saveForLater: "Keep for later",
  askAboutCloth: "Ask about this fabric",
  requestMeasurements: "Request a measuring call",
  bookFitting: "Book a fitting",

  /* Discovery */
  viewPiece: "View the piece",
  viewCollection: "See the collection",
  viewAll: "See everything",
  loadMore: "Show more pieces",
  filter: "Refine",
  clearFilters: "Clear",
  sort: "Order by",

  /* Editorial */
  readStory: "Read the story",
  readMore: "Continue reading",
  keepReading: "Keep reading",
  seeHowWeWork: "See how we work",
  meetFounder: "Meet the founder",
  openCareGuide: "Open the care guide",

  /* Forms */
  subscribe: "Join the letter",
  submit: "Send",
  sendMessage: "Send to the atelier",
  submitting: "Sending…",
  sent: "Sent",
  tryAgain: "Try again",

  /* Navigation */
  menu: "Menu",
  close: "Close",
  back: "Back",
  search: "Search",
  skipToContent: "Skip to content",
} as const;

export const bag = {
  label: "Bag",
  emptyHeading: "Your bag is empty.",
  emptyBody:
    "Nothing here yet. Every piece we make starts with a length of fabric and a set of measurements — begin with whichever comes first.",
  emptyPrimary: { label: "See the collection", href: "/collection" },
  emptySecondary: { label: "Read how ordering works", href: "/made-to-order" },

  /** Shown above the line items, according to what is in the bag. */
  readyNotice: "Held for you for 60 minutes. Packed and sent within two working days.",
  madeToOrderNotice:
    "Held for you for 60 minutes. Cutting begins once your order is placed.",
  mixedNotice:
    "Your bag holds one piece that is ready and one we will cut for you. We send them together unless you ask us to split the shipment.",
  splitShipment: "Send the ready piece first",
  itemCutFrom: "Cut from",
  itemLeadTime: "Ready in",
  subtotal: "Subtotal",
  shippingNote: "Shipping and duties are calculated at checkout.",
  giftNote: "Add a note for the box",
  reservationExpired:
    "Your hold has lapsed and the fabric has gone back on the table. Add the piece again to continue.",
} as const;

export const soldOut = {
  /**
   * Two different kinds of unavailable, and conflating them costs sales:
   *   RUN FINISHED   — that size is gone from the cut run, but fabric remains,
   *                    so it can still be made. Not a dead end.
   *   FABRIC FINISHED — the roll is empty. Nothing more can be made, ever.
   */
  badgeRunFinished: "Sold out of this size",
  runFinishedHeading: "This size has sold out — but the fabric has not.",
  runFinishedBody:
    "Every piece we cut in this size has found an owner. There is still fabric on the roll, so we can make this one for you: same fabric, same finishing, three to five weeks.",
  runFinishedPrimary: "Cut this to my measure",
  runFinishedSecondary: "See what is ready to ship",

  badge: "Fabric finished",
  badgeFinalMetres: "Final metres",
  heading: "This fabric has run out.",
  body:
    "The roll this piece was cut from is finished, and we will not remake it in a different fabric. Leave your size and we will write to you if the same fabric ever reaches us again, or we will show you the closest weight and handle we have now.",
  primary: "Ask about this fabric",
  secondary: "Show me something similar",
  waitlistLabel: "Tell me if it returns",
  waitlistConfirmation:
    "Noted. If this fabric comes back, you will hear from us before it goes on the site.",
  lowStockPrefix: "Enough fabric left for",
  lowStockSuffix: "pieces",
  singleLeft: "Enough fabric left for one piece",
  sizeUnavailable:
    "Not enough fabric left to cut this size. Any other size can still be made.",
  sizeReadyNow: "Ready to ship",
  sizeMadeToOrder: "Can be cut for you",
} as const;

export const checkout = {
  heading: "Your order",
  stepDetails: "Your details",
  stepMeasurements: "Measurements",
  stepDelivery: "Delivery",
  stepPayment: "Payment",
  reviewHeading: "Before you place the order",
  reviewBody:
    "Read this once. The terms depend on how each piece was made, so they differ within the same order.",
  /** Applies to pieces taken from the cut run. */
  reviewPointsReady: [
    "Packed and dispatched within two working days.",
    "Returnable unworn within 14 days of arrival, in the packaging it came in.",
    "Alterations to fit are made once, at no cost, within the first year.",
  ],
  /** Applies to pieces cut to the customer's measurements. */
  reviewPointsMeasure: [
    "Cutting begins within two working days of your order.",
    "Finished and dispatched in three to five weeks.",
    "Alterations to fit are made once, at no cost, within the first year.",
    "Because it is cut to your measurements, it can be altered or exchanged but not returned for a refund.",
  ],
  placeOrder: "Place the order",
  placingOrder: "Placing your order…",
  paymentSecure: "Payment is encrypted end to end.",
  measurementPrompt:
    "Prefer to be measured properly? Choose your closest size now and we will call you to confirm before cutting.",
  giftPrompt: "Is this a gift? We will leave the price off the papers.",
  confirmationHeading: "Your order is with the atelier.",
  confirmationBody:
    "We have written to you with your order number and the fabric reserved in your name. You will hear from us again when your piece is cut, and once more when it is finished.",
  confirmationNext: "What happens now",
} as const;

export const forms = {
  newsletterHeading: "Letters from the atelier",
  newsletterBody:
    "We write when a new fabric arrives, when a piece leaves the workroom, and when something is genuinely worth your time. Roughly once a month, never more.",
  emailLabel: "Email address",
  emailPlaceholder: "you@example.com",
  namePlaceholder: "Your name",
  messagePlaceholder: "Tell us what you are after — a piece, a fabric, a fit.",
  optionalSuffix: "(optional)",
  consent:
    "We keep your address for the letter and nothing else. One click leaves.",
  newsletterSuccess: "You are on the list. The next letter goes out shortly.",
  contactSuccess:
    "Your message is with us. We answer within one working day, in the order the notes arrive.",
} as const;

export const errors = {
  requiredField: "This one we need.",
  invalidEmail: "That address is missing something — check it once more.",
  invalidPhone: "Add your country code so we can reach you.",
  sizeRequired: "Choose a size so we know what to cut.",
  paymentDeclined:
    "Your bank declined the payment. Nothing has been charged and the fabric is still held for you.",
  network:
    "The connection dropped before we could save that. Your details are still here — send it again.",
  generic:
    "Something on our side gave way. Nothing was lost. Try once more, or write to us and we will finish the order by hand.",
  notFoundHeading: "This page has been unpicked.",
  notFoundBody:
    "The address no longer leads anywhere. It may have been a piece that has since sold, or a link that changed when we reorganised the site.",
} as const;

export const badges = {
  deadstock: "Deadstock fabric",
  naturalFibre: "Natural fibre",
  readyToShip: "Ready to ship",
  madeToOrder: "Can be cut to measure",
  reclaimedTrims: "Reclaimed trims",
  oneOfFew: "One of few",
  handFinished: "Hand-finished",
} as const;

export const labels = {
  cloth: "Fabric",
  origin: "Where the fabric came from",
  composition: "Composition",
  trims: "Trims",
  weight: "Weight",
  finishing: "Finishing",
  leadTime: "Lead time",
  madeIn: "Made in",
  careHeading: "Living with it",
  measurementsHeading: "Measurements",
  metresRemaining: "Metres remaining",
} as const;

export const trust = {
  runLength: "Small runs, limited by the fabric we find",
  readyLeadTime: "In stock · dispatched in 2 working days",
  measureLeadTime: "Cut to measure · ready in 3–5 weeks",
  shipping: "Complimentary shipping worldwide over ₹25,000",
  alterations: "One free alteration within the first year",
  packaging: "Plastic-free packaging · plantable hang tag",
  repairs: "Repairs offered for the life of the garment",
} as const;
