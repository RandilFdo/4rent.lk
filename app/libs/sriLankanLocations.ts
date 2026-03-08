import { SriLankanDistrict } from "@/app/types";

export interface City {
  name: string;
  value: string;
  district: SriLankanDistrict;
}

export interface District {
  name: string;
  value: SriLankanDistrict;
  cities: City[];
}

export const sriLankanDistricts: District[] = [
  {
    name: "Ampara",
    value: "AMPARA",
    cities: [
      { name: "Ampara", value: "ampara", district: "AMPARA" },
      { name: "Kalmunai", value: "kalmunai", district: "AMPARA" },
      { name: "Sainthamaruthu", value: "sainthamaruthu", district: "AMPARA" },
      { name: "Dehiattakandiya", value: "dehiattakandiya", district: "AMPARA" },
      { name: "Akkaraipattu", value: "akkaraipattu", district: "AMPARA" },
      { name: "Damana", value: "damana", district: "AMPARA" },
      { name: "Lahugala", value: "lahugala", district: "AMPARA" },
      { name: "Mahaoya", value: "mahaoya", district: "AMPARA" },
      { name: "Padiyatalawa", value: "padiyatalawa", district: "AMPARA" },
      { name: "Uhana", value: "uhana", district: "AMPARA" },
      { name: "Sammanthurai", value: "sammanthurai", district: "AMPARA" },
      { name: "Thirukkovil", value: "thirukkovil", district: "AMPARA" },
      { name: "Pottuvil", value: "pottuvil", district: "AMPARA" },
      { name: "Komari", value: "komari", district: "AMPARA" },
    ]
  },
  {
    name: "Anuradhapura",
    value: "ANURADHAPURA",
    cities: [
      { name: "Anuradhapura", value: "anuradhapura", district: "ANURADHAPURA" },
      { name: "Kekirawa", value: "kekirawa", district: "ANURADHAPURA" },
      { name: "Medawachchiya", value: "medawachchiya", district: "ANURADHAPURA" },
      { name: "Eppawala", value: "eppawala", district: "ANURADHAPURA" },
      { name: "Mihintale", value: "mihintale", district: "ANURADHAPURA" },
      { name: "Galenbindunuwewa", value: "galenbindunuwewa", district: "ANURADHAPURA" },
      { name: "Horowupotana", value: "horowupotana", district: "ANURADHAPURA" },
      { name: "Ipalogama", value: "ipalogama", district: "ANURADHAPURA" },
      { name: "Kahatagasdigiliya", value: "kahatagasdigiliya", district: "ANURADHAPURA" },
      { name: "Kebithigollawa", value: "kebithigollawa", district: "ANURADHAPURA" },
      { name: "Nochchiyagama", value: "nochchiyagama", district: "ANURADHAPURA" },
      { name: "Palagala", value: "palagala", district: "ANURADHAPURA" },
      { name: "Rajanganaya", value: "rajanganaya", district: "ANURADHAPURA" },
      { name: "Rambewa", value: "rambewa", district: "ANURADHAPURA" },
    ]
  },
  {
    name: "Badulla",
    value: "BADULLA",
    cities: [
      { name: "Badulla", value: "badulla", district: "BADULLA" },
      { name: "Bandarawela", value: "bandarawela", district: "BADULLA" },
      { name: "Ella", value: "ella", district: "BADULLA" },
      { name: "Haputale", value: "haputale", district: "BADULLA" },
      { name: "Mahiyanganaya", value: "mahiyanganaya", district: "BADULLA" },
      { name: "Passara", value: "passara", district: "BADULLA" },
      { name: "Rideemaliyadda", value: "rideemaliyadda", district: "BADULLA" },
      { name: "Soranathota", value: "soranathota", district: "BADULLA" },
      { name: "Uva-Paranagama", value: "uva-paranagama", district: "BADULLA" },
      { name: "Welimada", value: "welimada", district: "BADULLA" },
      { name: "Haliela", value: "haliela", district: "BADULLA" },
      { name: "Kandaketiya", value: "kandaketiya", district: "BADULLA" },
      { name: "Lunugala", value: "lunugala", district: "BADULLA" },
      { name: "Meegahakivula", value: "meegahakivula", district: "BADULLA" },
    ]
  },
  {
    name: "Batticaloa",
    value: "BATTICALOA",
    cities: [
      { name: "Batticaloa", value: "batticaloa", district: "BATTICALOA" },
      { name: "Eravur", value: "eravur", district: "BATTICALOA" },
      { name: "Kattankudy", value: "kattankudy", district: "BATTICALOA" },
      { name: "Valachchenai", value: "valachchenai", district: "BATTICALOA" },
      { name: "Chenkalady", value: "chenkalady", district: "BATTICALOA" },
      { name: "Kokkadichcholai", value: "kokkadichcholai", district: "BATTICALOA" },
      { name: "Koralai Pattu", value: "koralai-pattu", district: "BATTICALOA" },
      { name: "Manmunai", value: "manmunai", district: "BATTICALOA" },
      { name: "Paddiruppu", value: "paddiruppu", district: "BATTICALOA" },
      { name: "Vakarai", value: "vakarai", district: "BATTICALOA" },
      { name: "Oddamavadi", value: "oddamavadi", district: "BATTICALOA" },
      { name: "Vellavelli", value: "vellavelli", district: "BATTICALOA" },
      { name: "Vantharumoolai", value: "vantharumoolai", district: "BATTICALOA" },
      { name: "Kirankulam", value: "kirankulam", district: "BATTICALOA" },
    ]
  },
  {
    name: "Colombo",
    value: "COLOMBO",
    cities: [
      { name: "Colombo", value: "colombo", district: "COLOMBO" },
      { name: "Dehiwala-Mount Lavinia", value: "dehiwala-mount-lavinia", district: "COLOMBO" },
      { name: "Moratuwa", value: "moratuwa", district: "COLOMBO" },
      { name: "Sri Jayawardenepura Kotte", value: "kotte", district: "COLOMBO" },
      { name: "Kaduwela", value: "kaduwela", district: "COLOMBO" },
      { name: "Maharagama", value: "maharagama", district: "COLOMBO" },
      { name: "Kesbewa", value: "kesbewa", district: "COLOMBO" },
      { name: "Boralesgamuwa", value: "boralesgamuwa", district: "COLOMBO" },
      { name: "Piliyandala", value: "piliyandala", district: "COLOMBO" },
      { name: "Homagama", value: "homagama", district: "COLOMBO" },
      { name: "Athurugiriya", value: "athurugiriya", district: "COLOMBO" },
      { name: "Avissawella", value: "avissawella", district: "COLOMBO" },
      { name: "Hanwella", value: "hanwella", district: "COLOMBO" },
      { name: "Padukka", value: "padukka", district: "COLOMBO" },
    ]
  },
  {
    name: "Galle",
    value: "GALLE",
    cities: [
      { name: "Galle", value: "galle", district: "GALLE" },
      { name: "Hikkaduwa", value: "hikkaduwa", district: "GALLE" },
      { name: "Ambalangoda", value: "ambalangoda", district: "GALLE" },
      { name: "Unawatuna", value: "unawatuna", district: "GALLE" },
      { name: "Weligama", value: "weligama", district: "GALLE" },
      { name: "Ahangama", value: "ahangama", district: "GALLE" },
      { name: "Bentota", value: "bentota", district: "GALLE" },
      { name: "Koggala", value: "koggala", district: "GALLE" },
      { name: "Thalpe", value: "thalpe", district: "GALLE" },
      { name: "Dodanduwa", value: "dodanduwa", district: "GALLE" },
      { name: "Baddegama", value: "baddegama", district: "GALLE" },
      { name: "Elpitiya", value: "elpitiya", district: "GALLE" },
      { name: "Neluwa", value: "neluwa", district: "GALLE" },
      { name: "Yakkalamulla", value: "yakkalamulla", district: "GALLE" },
    ]
  },
  {
    name: "Gampaha",
    value: "GAMPAHA",
    cities: [
      { name: "Gampaha", value: "gampaha", district: "GAMPAHA" },
      { name: "Negombo", value: "negombo", district: "GAMPAHA" },
      { name: "Kelaniya", value: "kelaniya", district: "GAMPAHA" },
      { name: "Wattala", value: "wattala", district: "GAMPAHA" },
      { name: "Ja-Ela", value: "ja-ela", district: "GAMPAHA" },
      { name: "Kadawatha", value: "kadawatha", district: "GAMPAHA" },
      { name: "Divulapitiya", value: "divulapitiya", district: "GAMPAHA" },
      { name: "Katana", value: "katana", district: "GAMPAHA" },
      { name: "Mirigama", value: "mirigama", district: "GAMPAHA" },
      { name: "Minuwangoda", value: "minuwangoda", district: "GAMPAHA" },
      { name: "Biyagama", value: "biyagama", district: "GAMPAHA" },
      { name: "Dompe", value: "dompe", district: "GAMPAHA" },
      { name: "Mahara", value: "mahara", district: "GAMPAHA" },
      { name: "Veyangoda", value: "veyangoda", district: "GAMPAHA" },
    ]
  },
  {
    name: "Hambantota",
    value: "HAMBANTOTA",
    cities: [
      { name: "Hambantota", value: "hambantota", district: "HAMBANTOTA" },
      { name: "Tangalle", value: "tangalle", district: "HAMBANTOTA" },
      { name: "Tissamaharama", value: "tissamaharama", district: "HAMBANTOTA" },
      { name: "Ambalantota", value: "ambalantota", district: "HAMBANTOTA" },
      { name: "Beliatta", value: "beliatta", district: "HAMBANTOTA" },
      { name: "Lunugamvehera", value: "lunugamvehera", district: "HAMBANTOTA" },
      { name: "Okewela", value: "okewela", district: "HAMBANTOTA" },
      { name: "Sooriyawewa", value: "sooriyawewa", district: "HAMBANTOTA" },
      { name: "Weeraketiya", value: "weeraketiya", district: "HAMBANTOTA" },
      { name: "Walasmulla", value: "walasmulla", district: "HAMBANTOTA" },
      { name: "Ranna", value: "ranna", district: "HAMBANTOTA" },
      { name: "Katuwana", value: "katuwana", district: "HAMBANTOTA" },
      { name: "Angunakolapelessa", value: "angunakolapelessa", district: "HAMBANTOTA" },
      { name: "Kirinda", value: "kirinda", district: "HAMBANTOTA" },
    ]
  },
  {
    name: "Jaffna",
    value: "JAFFNA",
    cities: [
      { name: "Jaffna", value: "jaffna", district: "JAFFNA" },
      { name: "Chavakachcheri", value: "chavakachcheri", district: "JAFFNA" },
      { name: "Point Pedro", value: "point-pedro", district: "JAFFNA" },
      { name: "Nallur", value: "nallur", district: "JAFFNA" },
      { name: "Sandilipay", value: "sandilipay", district: "JAFFNA" },
      { name: "Tellippalai", value: "tellippalai", district: "JAFFNA" },
      { name: "Karainagar", value: "karainagar", district: "JAFFNA" },
      { name: "Kayts", value: "kayts", district: "JAFFNA" },
      { name: "Velanai", value: "velanai", district: "JAFFNA" },
      { name: "Island North", value: "island-north", district: "JAFFNA" },
      { name: "Kopay", value: "kopay", district: "JAFFNA" },
      { name: "Uduvil", value: "uduvil", district: "JAFFNA" },
      { name: "Chankanai", value: "chankanai", district: "JAFFNA" },
      { name: "Delft", value: "delft", district: "JAFFNA" },
    ]
  },
  {
    name: "Kalutara",
    value: "KALUTARA",
    cities: [
      { name: "Kalutara", value: "kalutara", district: "KALUTARA" },
      { name: "Panadura", value: "panadura", district: "KALUTARA" },
      { name: "Beruwala", value: "beruwala", district: "KALUTARA" },
      { name: "Horana", value: "horana", district: "KALUTARA" },
      { name: "Bandaragama", value: "bandaragama", district: "KALUTARA" },
      { name: "Bulathsinhala", value: "bulathsinhala", district: "KALUTARA" },
      { name: "Dodangoda", value: "dodangoda", district: "KALUTARA" },
      { name: "Millaniya", value: "millaniya", district: "KALUTARA" },
      { name: "Madurawala", value: "madurawala", district: "KALUTARA" },
      { name: "Walallawita", value: "walallawita", district: "KALUTARA" },
      { name: "Agalawatta", value: "agalawatta", district: "KALUTARA" },
      { name: "Ingiriya", value: "ingiriya", district: "KALUTARA" },
      { name: "Mathugama", value: "mathugama", district: "KALUTARA" },
      { name: "Palindanuwara", value: "palindanuwara", district: "KALUTARA" },
    ]
  },
  {
    name: "Kandy",
    value: "KANDY",
    cities: [
      { name: "Kandy", value: "kandy", district: "KANDY" },
      { name: "Peradeniya", value: "peradeniya", district: "KANDY" },
      { name: "Gampola", value: "gampola", district: "KANDY" },
      { name: "Nawalapitiya", value: "nawalapitiya", district: "KANDY" },
      { name: "Kundasale", value: "kundasale", district: "KANDY" },
      { name: "Akurana", value: "akurana", district: "KANDY" },
      { name: "Galagedara", value: "galagedara", district: "KANDY" },
      { name: "Harispattuwa", value: "harispattuwa", district: "KANDY" },
      { name: "Minipe", value: "minipe", district: "KANDY" },
      { name: "Pathadumbara", value: "pathadumbara", district: "KANDY" },
      { name: "Medadumbara", value: "medadumbara", district: "KANDY" },
      { name: "Poojapitiya", value: "poojapitiya", district: "KANDY" },
      { name: "Ududumbara", value: "ududumbara", district: "KANDY" },
      { name: "Yatinuwara", value: "yatinuwara", district: "KANDY" },
    ]
  },
  {
    name: "Kegalle",
    value: "KEGALLE",
    cities: [
      { name: "Kegalle", value: "kegalle", district: "KEGALLE" },
      { name: "Mawanella", value: "mawanella", district: "KEGALLE" },
      { name: "Rambukkana", value: "rambukkana", district: "KEGALLE" },
      { name: "Warakapola", value: "warakapola", district: "KEGALLE" },
      { name: "Aranayaka", value: "aranayaka", district: "KEGALLE" },
      { name: "Bulathkohupitiya", value: "bulathkohupitiya", district: "KEGALLE" },
      { name: "Dehiowita", value: "dehiowita", district: "KEGALLE" },
      { name: "Deraniyagala", value: "deraniyagala", district: "KEGALLE" },
      { name: "Galigamuwa", value: "galigamuwa", district: "KEGALLE" },
      { name: "Ruwanwella", value: "ruwanwella", district: "KEGALLE" },
      { name: "Ambepussa", value: "ambepussa", district: "KEGALLE" },
      { name: "Alawwa", value: "alawwa", district: "KEGALLE" },
      { name: "Bopitiya", value: "bopitiya", district: "KEGALLE" },
      { name: "Hiripitiya", value: "hiripitiya", district: "KEGALLE" },
    ]
  },
  {
    name: "Kilinochchi",
    value: "KILINOCHCHI",
    cities: [
      { name: "Kilinochchi", value: "kilinochchi", district: "KILINOCHCHI" },
      { name: "Paranthan", value: "paranthan", district: "KILINOCHCHI" },
      { name: "Pooneryn", value: "pooneryn", district: "KILINOCHCHI" },
      { name: "Karachchi", value: "karachchi", district: "KILINOCHCHI" },
      { name: "Kandavalai", value: "kandavalai", district: "KILINOCHCHI" },
      { name: "Pachchilaipalli", value: "pachchilaipalli", district: "KILINOCHCHI" },
      { name: "Poonakary", value: "poonakary", district: "KILINOCHCHI" },
      { name: "Thunukkai", value: "thunukkai", district: "KILINOCHCHI" },
      { name: "Vadamarachchi", value: "vadamarachchi", district: "KILINOCHCHI" },
      { name: "Akaththiyanagar", value: "akaththiyanagar", district: "KILINOCHCHI" },
      { name: "Elephant Pass", value: "elephant-pass", district: "KILINOCHCHI" },
      { name: "Iranamadu", value: "iranamadu", district: "KILINOCHCHI" },
      { name: "Pallai", value: "pallai", district: "KILINOCHCHI" },
      { name: "Skanthapuram", value: "skanthapuram", district: "KILINOCHCHI" },
    ]
  },
  {
    name: "Kurunegala",
    value: "KURUNEGALA",
    cities: [
      { name: "Kurunegala", value: "kurunegala", district: "KURUNEGALA" },
      { name: "Kuliyapitiya", value: "kuliyapitiya", district: "KURUNEGALA" },
      { name: "Nikaweratiya", value: "nikaweratiya", district: "KURUNEGALA" },
      { name: "Pannala", value: "pannala", district: "KURUNEGALA" },
      { name: "Polgahawela", value: "polgahawela", district: "KURUNEGALA" },
      { name: "Bingiriya", value: "bingiriya", district: "KURUNEGALA" },
      { name: "Galgamuwa", value: "galgamuwa", district: "KURUNEGALA" },
      { name: "Ganewatta", value: "ganewatta", district: "KURUNEGALA" },
      { name: "Giribawa", value: "giribawa", district: "KURUNEGALA" },
      { name: "Ibbagamuwa", value: "ibbagamuwa", district: "KURUNEGALA" },
      { name: "Alawwa", value: "alawwa", district: "KURUNEGALA" },
      { name: "Ambanpola", value: "ambanpola", district: "KURUNEGALA" },
      { name: "Ehetuwewa", value: "ehetuwewa", district: "KURUNEGALA" },
      { name: "Kobeigane", value: "kobeigane", district: "KURUNEGALA" },
    ]
  },
  {
    name: "Mannar",
    value: "MANNAR",
    cities: [
      { name: "Mannar", value: "mannar", district: "MANNAR" },
      { name: "Murunkan", value: "murunkan", district: "MANNAR" },
      { name: "Pesalai", value: "pesalai", district: "MANNAR" },
      { name: "Madhu", value: "madhu", district: "MANNAR" },
      { name: "Manthai West", value: "manthai-west", district: "MANNAR" },
      { name: "Mannar Town", value: "mannar-town", district: "MANNAR" },
      { name: "Musalai", value: "musalai", district: "MANNAR" },
      { name: "Nanaddan", value: "nanaddan", district: "MANNAR" },
      { name: "Thunukkai", value: "thunukkai", district: "MANNAR" },
      { name: "Vellankulam", value: "vellankulam", district: "MANNAR" },
      { name: "Adampan", value: "adampan", district: "MANNAR" },
      { name: "Erukkalampiddy", value: "erukkalampiddy", district: "MANNAR" },
      { name: "Marichchikaddi", value: "marichchikaddi", district: "MANNAR" },
      { name: "Pomparippu", value: "pomparippu", district: "MANNAR" },
    ]
  },
  {
    name: "Matale",
    value: "MATALE",
    cities: [
      { name: "Matale", value: "matale", district: "MATALE" },
      { name: "Dambulla", value: "dambulla", district: "MATALE" },
      { name: "Galewela", value: "galewela", district: "MATALE" },
      { name: "Rattota", value: "rattota", district: "MATALE" },
      { name: "Yatawatta", value: "yatawatta", district: "MATALE" },
      { name: "Palapathwela", value: "palapathwela", district: "MATALE" },
      { name: "Ukuwela", value: "ukuwela", district: "MATALE" },
      { name: "Wilgamuwa", value: "wilgamuwa", district: "MATALE" },
      { name: "Naula", value: "naula", district: "MATALE" },
      { name: "Laggala-Pallegama", value: "laggala-pallegama", district: "MATALE" },
      { name: "Ambanganga Korale", value: "ambanganga-korale", district: "MATALE" },
      { name: "Pallepola", value: "pallepola", district: "MATALE" },
    ]
  },
  {
    name: "Matara",
    value: "MATARA",
    cities: [
      { name: "Matara", value: "matara", district: "MATARA" },
      { name: "Weligama", value: "weligama", district: "MATARA" },
      { name: "Akuressa", value: "akuressa", district: "MATARA" },
      { name: "Deniyaya", value: "deniyaya", district: "MATARA" },
      { name: "Hakmana", value: "hakmana", district: "MATARA" },
      { name: "Kamburupitiya", value: "kamburupitiya", district: "MATARA" },
      { name: "Kotapola", value: "kotapola", district: "MATARA" },
      { name: "Mulatiyana", value: "mulatiyana", district: "MATARA" },
      { name: "Pasgoda", value: "pasgoda", district: "MATARA" },
      { name: "Thihagoda", value: "thihagoda", district: "MATARA" },
      { name: "Athuraliya", value: "athuraliya", district: "MATARA" },
      { name: "Devinuwara", value: "devinuwara", district: "MATARA" },
      { name: "Kirinda", value: "kirinda", district: "MATARA" },
      { name: "Pitabeddara", value: "pitabeddara", district: "MATARA" },
    ]
  },
  {
    name: "Monaragala",
    value: "MONARAGALA",
    cities: [
      { name: "Monaragala", value: "monaragala", district: "MONARAGALA" },
      { name: "Wellawaya", value: "wellawaya", district: "MONARAGALA" },
      { name: "Bibile", value: "bibile", district: "MONARAGALA" },
      { name: "Buttala", value: "buttala", district: "MONARAGALA" },
      { name: "Kataragama", value: "kataragama", district: "MONARAGALA" },
      { name: "Siyambalanduwa", value: "siyambalanduwa", district: "MONARAGALA" },
      { name: "Thanamalwila", value: "thanamalwila", district: "MONARAGALA" },
      { name: "Madulla", value: "madulla", district: "MONARAGALA" },
      { name: "Medagama", value: "medagama", district: "MONARAGALA" },
      { name: "Sevanagala", value: "sevanagala", district: "MONARAGALA" },
      { name: "Badalkumbura", value: "badalkumbura", district: "MONARAGALA" },
      { name: "Katharagama", value: "katharagama", district: "MONARAGALA" },
      { name: "Lunugala", value: "lunugala", district: "MONARAGALA" },
      { name: "Sewanagala", value: "sewanagala", district: "MONARAGALA" },
    ]
  },
  {
    name: "Mullaitivu",
    value: "MULLAITIVU",
    cities: [
      { name: "Mullaitivu", value: "mullaitivu", district: "MULLAITIVU" },
      { name: "Puthukkudiyiruppu", value: "puthukkudiyiruppu", district: "MULLAITIVU" },
      { name: "Oddusuddan", value: "oddusuddan", district: "MULLAITIVU" },
      { name: "Thunukkai", value: "thunukkai", district: "MULLAITIVU" },
      { name: "Alankulam", value: "alankulam", district: "MULLAITIVU" },
      { name: "Karachchi", value: "karachchi", district: "MULLAITIVU" },
      { name: "Welioya", value: "welioya", district: "MULLAITIVU" },
      { name: "Karaithuraipattu", value: "karaithuraipattu", district: "MULLAITIVU" },
      { name: "Maritimepattu", value: "maritimepattu", district: "MULLAITIVU" },
      { name: "Puthukkudiyiruppu", value: "puthukkudiyiruppu-2", district: "MULLAITIVU" },
    ]
  },
  {
    name: "Nuwara Eliya",
    value: "NUWARA_ELIYA",
    cities: [
      { name: "Nuwara Eliya", value: "nuwara-eliya", district: "NUWARA_ELIYA" },
      { name: "Hatton", value: "hatton", district: "NUWARA_ELIYA" },
      { name: "Talawakele", value: "talawakele", district: "NUWARA_ELIYA" },
      { name: "Kotagala", value: "kotagala", district: "NUWARA_ELIYA" },
      { name: "Dickoya", value: "dickoya", district: "NUWARA_ELIYA" },
      { name: "Maskeliya", value: "maskeliya", district: "NUWARA_ELIYA" },
      { name: "Bogawantalawa", value: "bogawantalawa", district: "NUWARA_ELIYA" },
      { name: "Ragala", value: "ragala", district: "NUWARA_ELIYA" },
      { name: "Horton Plains", value: "horton-plains", district: "NUWARA_ELIYA" },
      { name: "Ambawela", value: "ambawela", district: "NUWARA_ELIYA" },
      { name: "Ambagamuwa", value: "ambagamuwa", district: "NUWARA_ELIYA" },
      { name: "Dayagama Bazaar", value: "dayagama-bazaar", district: "NUWARA_ELIYA" },
      { name: "Ginigathhena", value: "ginigathhena", district: "NUWARA_ELIYA" },
      { name: "Lindula", value: "lindula", district: "NUWARA_ELIYA" },
    ]
  },
  {
    name: "Polonnaruwa",
    value: "POLONNARUWA",
    cities: [
      { name: "Polonnaruwa", value: "polonnaruwa", district: "POLONNARUWA" },
      { name: "Hingurakgoda", value: "hingurakgoda", district: "POLONNARUWA" },
      { name: "Medirigiriya", value: "medirigiriya", district: "POLONNARUWA" },
      { name: "Thamankaduwa", value: "thamankaduwa", district: "POLONNARUWA" },
      { name: "Dimbulagala", value: "dimbulagala", district: "POLONNARUWA" },
      { name: "Elahara", value: "elahara", district: "POLONNARUWA" },
      { name: "Lankapura", value: "lankapura", district: "POLONNARUWA" },
      { name: "Welikanda", value: "welikanda", district: "POLONNARUWA" },
      { name: "Bakamuna", value: "bakamuna", district: "POLONNARUWA" },
      { name: "Minneriya", value: "minneriya", district: "POLONNARUWA" },
      { name: "Galoya", value: "galoya", district: "POLONNARUWA" },
    ]
  },
  {
    name: "Puttalam",
    value: "PUTTALAM",
    cities: [
      { name: "Puttalam", value: "puttalam", district: "PUTTALAM" },
      { name: "Chilaw", value: "chilaw", district: "PUTTALAM" },
      { name: "Wennappuwa", value: "wennappuwa", district: "PUTTALAM" },
      { name: "Anamaduwa", value: "anamaduwa", district: "PUTTALAM" },
      { name: "Arachchikattuwa", value: "arachchikattuwa", district: "PUTTALAM" },
      { name: "Karuwalagaswewa", value: "karuwalagaswewa", district: "PUTTALAM" },
      { name: "Mahawewa", value: "mahawewa", district: "PUTTALAM" },
      { name: "Nattandiya", value: "nattandiya", district: "PUTTALAM" },
      { name: "Nawagattegama", value: "nawagattegama", district: "PUTTALAM" },
      { name: "Vanathavilluwa", value: "vanathavilluwa", district: "PUTTALAM" },
      { name: "Kalpitiya", value: "kalpitiya", district: "PUTTALAM" },
      { name: "Madampe", value: "madampe", district: "PUTTALAM" },
      { name: "Mundalama", value: "mundalama", district: "PUTTALAM" },
      { name: "Pallama", value: "pallama", district: "PUTTALAM" },
    ]
  },
  {
    name: "Ratnapura",
    value: "RATNAPURA",
    cities: [
      { name: "Ratnapura", value: "ratnapura", district: "RATNAPURA" },
      { name: "Balangoda", value: "balangoda", district: "RATNAPURA" },
      { name: "Eheliyagoda", value: "eheliyagoda", district: "RATNAPURA" },
      { name: "Embilipitiya", value: "embilipitiya", district: "RATNAPURA" },
      { name: "Godakawela", value: "godakawela", district: "RATNAPURA" },
      { name: "Imbulpe", value: "imbulpe", district: "RATNAPURA" },
      { name: "Kalawana", value: "kalawana", district: "RATNAPURA" },
      { name: "Kuruwita", value: "kuruwita", district: "RATNAPURA" },
      { name: "Nivithigala", value: "nivithigala", district: "RATNAPURA" },
      { name: "Pelmadulla", value: "pelmadulla", district: "RATNAPURA" },
      { name: "Ayagama", value: "ayagama", district: "RATNAPURA" },
      { name: "Elapatha", value: "elapatha", district: "RATNAPURA" },
      { name: "Kolonna", value: "kolonna", district: "RATNAPURA" },
      { name: "Weligepola", value: "weligepola", district: "RATNAPURA" },
    ]
  },
  {
    name: "Trincomalee",
    value: "TRINCOMALEE",
    cities: [
      { name: "Trincomalee", value: "trincomalee", district: "TRINCOMALEE" },
      { name: "Kinniya", value: "kinniya", district: "TRINCOMALEE" },
      { name: "Muttur", value: "muttur", district: "TRINCOMALEE" },
      { name: "Kantale", value: "kantale", district: "TRINCOMALEE" },
      { name: "Gomarankadawala", value: "gomarankadawala", district: "TRINCOMALEE" },
      { name: "Kuchchaveli", value: "kuchchaveli", district: "TRINCOMALEE" },
      { name: "Morawewa", value: "morawewa", district: "TRINCOMALEE" },
      { name: "Padavi Sri Pura", value: "padavi-sri-pura", district: "TRINCOMALEE" },
      { name: "Seruvila", value: "seruvila", district: "TRINCOMALEE" },
      { name: "Thambalagamuwa", value: "thambalagamuwa", district: "TRINCOMALEE" },
      { name: "Lankapatuna", value: "lankapatuna", district: "TRINCOMALEE" },
      { name: "Nilaveli", value: "nilaveli", district: "TRINCOMALEE" },
      { name: "Uppuveli", value: "uppuveli", district: "TRINCOMALEE" },
    ]
  },
  {
    name: "Vavuniya",
    value: "VAVUNIYA",
    cities: [
      { name: "Vavuniya", value: "vavuniya", district: "VAVUNIYA" },
      { name: "Cheddikulam", value: "cheddikulam", district: "VAVUNIYA" },
      { name: "Nedunkeni", value: "nedunkeni", district: "VAVUNIYA" },
      { name: "Vavuniya South", value: "vavuniya-south", district: "VAVUNIYA" },
      { name: "Vavuniya North", value: "vavuniya-north", district: "VAVUNIYA" },
      { name: "Omanthai", value: "omanthai", district: "VAVUNIYA" },
      { name: "Pampaimadu", value: "pampaimadu", district: "VAVUNIYA" },
      { name: "Poovarasankulam", value: "poovarasankulam", district: "VAVUNIYA" },
      { name: "Thandikulam", value: "thandikulam", district: "VAVUNIYA" },
      { name: "Vengalacheddikulam", value: "vengalacheddikulam", district: "VAVUNIYA" },
      { name: "Periyakulam", value: "periyakulam", district: "VAVUNIYA" },
    ]
  }
];

export const getAllCities = (): City[] => {
  return sriLankanDistricts.flatMap(district => district.cities);
};

export const getCitiesByDistrict = (district: SriLankanDistrict): City[] => {
  const foundDistrict = sriLankanDistricts.find(d => d.value === district);
  return foundDistrict ? foundDistrict.cities : [];
};

export const getDistrictByCity = (cityValue: string): SriLankanDistrict | null => {
  for (const district of sriLankanDistricts) {
    const city = district.cities.find(c => c.value === cityValue);
    if (city) return district.value;
  }
  return null;
};
