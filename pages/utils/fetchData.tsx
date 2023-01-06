import array from 'lodash/array';
import Queen from "../classes/Queen";
import Season from "../classes/Season";
import { sortQueensByName } from './utils';

type data = {
    queens: Array<Queen>,
    seasons: Array<Season>
}

// create all standard queens and predefined seasons
export default function fetchData(): data {

    // US 1
    const akashia = new Queen("Akashia", 3, 2, 7, 3, 2, 7, 11, "Akashia");
    const bebe = new Queen("BeBe Zahara Benet", 6, 7, 8, 12, 6, 10, 9, "BeBe");
    const jade = new Queen("Jade Sotomayor", 3, 3, 8, 7, 3, 7, 7, "Jade");
    const ninaf = new Queen("Nina Flowers", 7, 5, 5, 11, 6, 10, 6, "NinaFlowers");
    const ongina = new Queen("Ongina", 9, 8, 7, 9, 10, 9, 8, "Ongina");
    const rebecca = new Queen("Rebecca Glasscock", 3, 3, 6, 4, 2, 6, 5, "Rebecca");
    const shannel = new Queen("Shannel", 5, 5, 5, 9, 4, 11, 7, "Shannel");
    const tammie = new Queen("Tammie Brown", 6, 7, 5, 7, 6, 7, 6, "Tammie");
    const victoria = new Queen("Victoria 'Porkchop' Parker", 3, 6, 4, 3, 6, 5, 4, "Victoria");
    const us_1_queens = [akashia, bebe, jade, ninaf, ongina, rebecca, shannel, tammie, victoria];
    const us_1 = new Season("us_1", us_1_queens);

    // US 2
    const jessica = new Queen("Jessica Wild", 8, 6, 9, 7, 8, 8, 10, "Jessica");
    const jujubee = new Queen("Jujubee", 9, 11, 7, 8, 12, 6, 12, "Jujubee");
    const morgan = new Queen("Morgan McMichaels", 6, 6, 10, 9, 5, 10, 10, "Morgan");
    const mystique = new Queen("Mystique Summers", 4, 5, 3, 3, 3, 5, 6, "Mystique");
    const nicole = new Queen("Nicole Paige Brooks", 4, 4, 4, 6, 4, 7, 6, "Nicole");
    const pandora = new Queen("Pandora Boxx", 12, 11, 6, 8, 10, 8, 7, "Pandora");
    const raven = new Queen("Raven", 5, 8, 9, 10, 5, 8, 11, "Raven");
    const sahara = new Queen("Sahara Davenport", 6, 6, 10, 4, 6, 7, 10, "Sahara");
    const shangela = new Queen("Shangela", 14, 13, 10, 3, 9, 9, 12, "Shangela");
    const sonique = new Queen("Kylie Sonique Love", 11, 9, 10, 9, 8, 11, 11, "Kylie");
    const tatianna = new Queen("Tatianna", 8, 11, 8, 8, 10, 8, 10, "Tatianna");
    const tyra = new Queen("King Tyra", 11, 7, 8, 11, 8, 9, 10, "Tyra");
    const us_2_queens = [jessica, jujubee, morgan, mystique, nicole, pandora, raven, sahara, shangela, sonique, tatianna, tyra];
    const us_2 = new Season("us_2", us_2_queens);

    // US 3
    const alexis = new Queen("Alexis Mateo", 14, 12, 9, 7, 10, 8, 12, "Alexis");
    const carmen = new Queen("Carmen Carrera", 3, 8, 6, 4, 3, 7, 7, "Carmen");
    const delta = new Queen("Delta Work", 4, 6, 5, 5, 5, 7, 7, "Delta");
    const india = new Queen("India Ferrah", 6, 4, 8, 6, 3, 10, 9, "India");
    const manila = new Queen("Manila Luzon", 12, 11, 7, 14, 10, 13, 11, "Manila");
    const mariah = new Queen("Mariah Paris Balenciaga", 6, 4, 7, 8, 4, 9, 8, "Mariah");
    const mimi = new Queen("Mimi Imfurst", 11, 6, 6, 10, 7, 8, 6, "Mimi");
    const phoenix = new Queen("Phoenix", 3, 3, 6, 5, 3, 5, 4, "Phoenix");
    const raja = new Queen("Raja", 11, 13, 6, 14, 12, 14, 9, "Raja");
    const stacey = new Queen("Stacy Layne Matthews", 6, 7, 5, 4, 10, 5, 6, "Stacy");
    const venus = new Queen("Venus D-Lite", 4, 5, 8, 2, 3, 5, 2, "Venus");
    const yara = new Queen("Yara Sofia", 11, 9, 9, 13, 7, 10, 8, "Yara");
    const us_3_queens = [alexis, carmen, delta, india, manila, mariah, mimi, phoenix, raja, shangela, stacey, venus, yara];
    const us_3 = new Season("us_3", us_3_queens);
    
    // US 4
    const alisa = new Queen("Alisa Summers", 4, 4, 5, 2, 3, 5, 4, "Alisa");
    const chad = new Queen("Chad Michaels", 11, 10, 8, 9, 12, 10, 8, "Chad");
    const dida = new Queen("Dida Ritz", 8, 7, 8, 5, 7, 7, 12, "Dida");
    const jiggly = new Queen("Jiggly Caliente", 4, 6, 9, 4, 4, 7, 10, "Jiggly");
    const kenya = new Queen("Kenya Olivera", 9, 6, 6, 6, 8, 7, 8, "Kenya");
    const leshauwn = new Queen("Lashauwn Beyond", 4, 4, 6, 11, 5, 7, 7, "Lashauwn");
    const latrice = new Queen("Latrice Royale", 11, 8, 9, 8, 7, 9, 13, "Latrice");
    const madame = new Queen("Madame LaQueer", 4, 7, 6, 5, 9, 7, 6, "Madame");
    const milan = new Queen("Milan", 4, 5, 9, 7, 5, 8, 10, "Milan");
    const phiphi = new Queen("Jaremi Carey", 13, 9, 8, 10, 10, 10, 8, "PhiPhi");
    const princess = new Queen("The Princess", 4, 4, 5, 7, 4, 7, 7, "Princess");
    const willam = new Queen("Willam", 10, 8, 7, 10, 10, 9, 8, "Willam");
    const us_4_queens = [alisa, chad, dida, jiggly, kenya, leshauwn, latrice, madame, milan, phiphi, princess, willam];
    const us_4 = new Season("us_4", us_4_queens);
    
    // US 5
    const alaska = new Queen("Alaska", 15, 14, 7, 8, 14, 10, 11, "Alaska");
    const alyssa = new Queen("Alyssa Edwards", 4, 6, 15, 6, 10, 9, 12, "Alyssa");
    const coco = new Queen("Coco Montrese", 10, 10, 11, 9, 7, 9, 15, "Coco");
    const detox = new Queen("Detox", 10, 9, 9, 9, 8, 12, 11, "Detox");
    const honey = new Queen("Honey Mahogany", 10, 3, 3, 6, 6, 8, 4, "Honey");
    const ivy = new Queen("Ivy Winters", 11, 4, 8, 12, 7, 10, 7, "Ivy");
    const jadejolie = new Queen("Jade Jolie", 5, 7, 8, 7, 8, 7, 8, "JadeJ");
    const jinkx = new Queen("Jinkx Monsoon", 15, 15, 9, 8, 15, 9, 8, "Jinkx");
    const lineysha = new Queen("Lineysha Sparx", 10, 4, 7, 11, 5, 9, 8, "Lineysha");
    const monica = new Queen("Monica Beverly Hillz", 4, 4, 6, 6, 3, 8, 8, "Monica");
    const penny = new Queen("Penny Tration", 4, 5, 4, 5, 5, 5, 4, "Penny");
    const roxxxy = new Queen("Roxxxy Andrews", 7, 4, 7, 11, 8, 10, 12, "Roxxxy");
    const serena = new Queen("Serena ChaCha", 3, 3, 7, 4, 5, 5, 8, "Serena");
    const vivienne = new Queen("Vivienne Pinay", 7, 3, 4, 5, 3, 6, 4, "Vivienne");
    const us_5_queens = [alaska, alyssa, coco, detox, honey, ivy, jadejolie, jinkx, lineysha, monica, penny, roxxxy, serena, vivienne];
    const us_5 = new Season("us_5", us_5_queens);

    // US 6
    const adore = new Queen("Adore Delano", 9, 11, 9, 6, 9, 8, 11, "Adore");
    const april = new Queen("April Carrión", 5, 5, 6, 9, 5, 9, 8, "April");
    const bendelacreme = new Queen("BenDeLaCreme", 12, 12, 11, 10, 15, 10, 9, "Bendelacreme");
    const bianca = new Queen("Bianca Del Rio", 11, 15, 7, 13, 15, 10, 5, "Bianca");
    const courtney = new Queen("Courtney Act", 11, 8, 10, 10, 10, 12, 9, "Courtney");
    const darienne = new Queen("Darienne Lake", 11, 8, 7, 4, 9, 8, 13, "Darienne");
    const gia = new Queen("Gia Gunn", 10, 4, 8, 8, 4, 8, 9, "Gia");
    const joslyn = new Queen("Joslyn Fox", 6, 7, 8, 6, 8, 8, 11, "Joslyn");
    const kelly = new Queen("Kelly Mantle", 6, 6, 5, 5, 4, 7, 4, "Kellu");
    const laganja = new Queen("Laganja Estranja", 9, 5, 14, 8, 6, 10, 15, "Laganja");
    const magnolia = new Queen("Magnolia Crawford", 4, 5, 6, 4, 5, 7, 4, "Magnolia");
    const milk = new Queen("Milk", 6, 6, 7, 8, 8, 7, 7, "Milk");
    const trinityk = new Queen("Trinity K. Bonet", 9, 9, 13, 12, 4, 10, 15, "TrinityKB");
    const vivacious = new Queen("Vivacious", 4, 5, 5, 4, 4, 7, 7, "Vivacious");
    const us_6_queens = [adore, april, bendelacreme, bianca, courtney, darienne, gia, joslyn, kelly, laganja, magnolia, milk, trinityk, vivacious];
    const us_6 = new Season("us_6", us_6_queens);

    // US 7
    const ginger = new Queen("Ginger Minj", 14, 12, 8, 9, 15, 7, 12, "Ginger");
    const jaidynn = new Queen("Jaidynn Diore Fierce", 9, 7, 8, 6, 6, 7, 11, "Jaidynn");
    const jasmine = new Queen("Jasmine Masters", 3, 4, 6, 5, 2, 7, 6, "Jasmine");
    const kandy = new Queen("Kandy Ho", 4, 4, 7, 5, 4, 7, 10, "KandyH");
    const katya = new Queen("Katya", 9, 12, 9, 7, 12, 10, 10, "Katya");
    const kennedy = new Queen("Kennedy Davenport", 9, 8, 10, 8, 11, 10, 14, "Kennedy");
    const max = new Queen("Max", 10, 7, 5, 8, 4, 8, 5, "Max");
    const fame = new Queen("Miss Fame", 8, 4, 5, 11, 3, 10, 5, "MissFame");
    const kasha = new Queen("Mrs. Kasha Davis", 11, 8, 9, 8, 6, 8, 7, "Kasha");
    const pearl = new Queen("Pearl", 7, 10, 8, 9, 10, 9, 5, "Pearl");
    const sashab = new Queen("Frisbee Jenkins", 6, 6, 4, 4, 6, 6, 4, "SashaB");
    const tempest = new Queen("Tempest DuJour", 6, 6, 5, 3, 6, 7, 4, "Tempest");
    const trixie = new Queen("Trixie Mattel", 13, 10, 6, 10, 11, 10, 5, "Trixie");
    const violet = new Queen("Violet Chachki", 6, 7, 8, 15, 8, 13, 8, "Violet");
    const us_7_queens = [ginger, jaidynn, jasmine, kandy, katya, kennedy, max, fame, kasha, pearl, sashab, tempest, trixie, violet];
    const us_7 = new Season("us_7", us_7_queens);

    // US 8
    const acid = new Queen("Acid Betty", 9, 4, 7, 10, 5, 11, 7, "Acid");
    const bob = new Queen("Bob The Drag Queen", 15, 15, 8, 9, 15, 8, 12, "Bob");
    const chichi = new Queen("Chi Chi DeVayne", 8, 4, 13, 8, 6, 8, 13, "ChiChi");
    const cynthia = new Queen("Cynthia Lee Fontaine", 4, 4, 7, 6, 4, 7, 6, "Cynthia");
    const dax = new Queen("Dax ExclamationPoint", 5, 6, 6, 5, 6, 5, 4, "Dax");
    const derrick = new Queen("Derrick Barry", 7, 7, 8, 8, 9, 7, 8, "Derrick");
    const kim = new Queen("Kim Chi", 10, 7, 4, 15, 8, 13, 4, "Kim");
    const laila = new Queen("Laila McQueen", 6, 6, 4, 7, 6, 8, 7, "Laila");
    const naomi = new Queen("Naomi Smalls", 9, 7, 10, 14, 10, 12, 11, "Naomi");
    const naysha = new Queen("Naysha Lopez", 6, 4, 4, 4, 3, 6, 7, "Naysga");
    const robbie = new Queen("Robbie Turner", 4, 5, 6, 4, 3, 6, 6, "Robbie");
    const thorgy = new Queen("Thorgy Thor", 14, 9, 6, 9, 13, 9, 8, "Thorgy");
    const us_8_queens = [acid, bob, chichi, cynthia, dax, derrick, kim, laila, naomi, naysha, robbie, thorgy];
    const us_8 = new Season("us_8", us_8_queens);

    // US 9
    const aja = new Queen("Aja LaBeija", 4, 8, 12, 11, 9, 10, 11, "Aja");
    const alexism = new Queen("Alexis Michelle", 8, 7, 9, 7, 13, 6, 10, "AlexisM");
    const charlie = new Queen("Charlie Hides", 10, 6, 5, 7, 4, 9, 2, "Charlie");
    const eureka = new Queen("Eureka!", 9, 11, 8, 10, 13, 10, 12, "Eureka");
    const farrah = new Queen("Farrah Moan", 9, 4, 7, 3, 6, 8, 7, "Farrah");
    const jaymes = new Queen("Jaymes Mansfield", 6, 6, 3, 6, 5, 7, 6, "Jaymes");
    const kimora = new Queen("Kimora Blac", 5, 5, 4, 6, 5, 8, 7, "Kimora");
    const ninab = new Queen("Nina Bo'Nina Brown", 4, 8, 10, 9, 10, 10, 11, "NinaBB");
    const peppermint = new Queen("Peppermint", 11, 9, 10, 9, 4, 7, 13, "Peppermint");
    const sasha = new Queen("Sasha Velour", 9, 10, 8, 10, 11, 13, 11, "Sasha");
    const shea = new Queen("Shea Couleé", 11, 12, 15, 12, 11, 15, 15, "Shea");
    const trinity = new Queen("Trinity The Tuck", 13, 11, 9, 15, 10, 13, 11, "TrinityTT");
    const valentina = new Queen("Valentina", 11, 7, 10, 9, 9, 9, 10, "Valentina");
    const us_9_queens = [aja, alexism, charlie, cynthia, eureka, farrah, jaymes, kimora, ninab, peppermint, sasha, shea, trinity, valentina];
    const us_9 = new Season("us_9", us_9_queens);

    // US 10
    const aquaria = new Queen("Aquaria", 6, 11, 8, 15, 12, 14, 11, "Aquaria");
    const asia = new Queen("Asia O'Hara", 11, 9, 6, 6, 7, 9, 9, "Asia");
    const blair = new Queen("Blair St. Clair", 9, 8, 6, 10, 8, 8, 7, "Blair");
    const dusty = new Queen("Dusty Ray Bottoms", 8, 8, 6, 7, 6, 7, 6, "Dusty");
    const kalorie = new Queen("Kalorie K. Williams", 6, 6, 6, 5, 7, 7, 8, "Kalorie");
    const kameron = new Queen("Kameron Michaels", 5, 8, 14, 10, 8, 8, 15, "Kameron");
    const mayhem = new Queen("Mayhem Miller", 4, 8, 9, 13, 7, 9, 10, "Mayhem");
    const miz = new Queen("Miz Cracker", 13, 11, 5, 12, 15, 9, 8, "Miz");
    const monet = new Queen("Monét X Change", 11, 11, 14, 9, 10, 10, 15, "Monet");
    const monique = new Queen("Mo Heart", 12, 8, 6, 10, 13, 12, 10, "Monique");
    const vanessa = new Queen("Vanessa 'Vanjie' Mateo", 9, 6, 8, 6, 9, 7, 11, "Vanjie");
    const vixen = new Queen("The Vixen", 5, 4, 12, 9, 3, 8, 12, "Vixen");
    const yuhua = new Queen("Yuhua Hamasaki", 4, 4, 6, 9, 6, 7, 7, "Yuhua");
    const us_10_queens = [aquaria, asia, blair, dusty, eureka, kalorie, kameron, mayhem, miz, monet, monique, vanessa, vixen, yuhua];
    const us_10 = new Season("us_10", us_10_queens);

    // US 11
    const akeria = new Queen("A'keria C. Davenport", 11, 9, 11, 8, 10, 13, 10, "Akeria");
    const ariel = new Queen("Ariel Versace", 8, 6, 8, 5, 8, 8, 8, "Ariel");
    const brooke = new Queen("Brooke Lynn Hytes", 8, 8, 13, 12, 8, 10, 13, "Brooke");
    const honeyd = new Queen("Honey Davenport", 4, 6, 5, 7, 4, 9, 4, "HoneyD");
    const kahanna = new Queen("Kahanna Montrese", 4, 5, 5, 4, 5, 6, 8, "Kahanna");
    const mercedes = new Queen("Mercedes Iman Diamond", 4, 6, 4, 6, 6, 8, 8, "Mercedes");
    const ninaw = new Queen("Nina West", 12, 11, 6, 8, 11, 8, 6, "NinaW");
    const plastique = new Queen("Plastique Tiara", 10, 7, 8, 11, 8, 10, 9, "Plastique");
    const rajah = new Queen("Ra'Jah O'Hara", 8, 8, 11, 12, 9, 12, 13, "Rajah");
    const scarlet = new Queen("Scarlet Envy", 13, 7, 6, 13, 8, 10, 7, "Scarlet");
    const shuga = new Queen("Shuga Cain", 10, 9, 7, 6, 7, 10, 7, "Shuga");
    const silky = new Queen("Silky Nutmeg Ganache", 10, 10, 9, 8, 10, 10, 12, "Silky");
    const yvie = new Queen("Yvie Oddly", 12, 7, 13, 12, 9, 12, 15, "Yvie");
    const us_11_queens = [akeria, ariel, brooke, honeyd, kahanna, mercedes, ninaw, plastique, rajah, scarlet, shuga, silky, vanessa, yvie];
    const us_11 = new Season("us_11", us_11_queens);

    // US 12
    const aiden = new Queen("Aiden Zhane", 9, 3, 6, 4, 3, 6, 6, "Aiden");
    const brita = new Queen("Brita", 7, 8, 7, 4, 6, 8, 11, "Brita");
    const crystal = new Queen("Crystal Methyd", 6, 8, 8, 9, 8, 12, 6, "CrystalM");
    const dahlia = new Queen("Dahlia Sin", 4, 4, 6, 5, 5, 10, 4, "Dahlia");
    const gigi = new Queen("Gigi Goode", 10, 11, 11, 13, 9, 12, 8, "Gigi");
    const heidi = new Queen("Heidi N Closet", 6, 9, 11, 6, 12, 7, 13, "Heidi");
    const jackie = new Queen("Jackie Cox", 11, 12, 6, 6, 13, 9, 11, "Jackie");
    const jaida = new Queen("Jaida Essence Hall", 8, 5, 10, 15, 8, 13, 12, "Jaida");
    const jan = new Queen("Jan", 8, 4, 12, 9, 5, 10, 9, "Jan");
    const nicky = new Queen("Nicky Doll", 4, 4, 5, 12, 3, 11, 5, "Nicky");
    const rock = new Queen("Rock M. Sakura", 6, 6, 6, 4, 8, 8, 7, "Rock");
    const widow = new Queen("Widow Von'Du", 11, 7, 13, 8, 11, 10, 15, "Widow");
    const us_12_queens = [aiden, brita, crystal, dahlia, gigi, heidi, jackie, jaida, jan, nicky, rock, widow];
    const us_12 = new Season("us_12", us_12_queens);

    // US 13
    const denali = new Queen("Denali", 4, 8, 14, 9, 10, 11, 13, "Denali");
    const elliott = new Queen("Elliott With 2 Ts", 5, 5, 12, 9, 3, 8, 11, "Elliott");
    const mik = new Queen("Gottmik", 8, 11, 6, 13, 12, 13, 6, "Gottmik");
    const joey = new Queen("Joey Jay", 6, 7, 6, 5, 5, 7, 7, "Joey");
    const kahmora = new Queen("Kahmora Hall", 3, 4, 3, 5, 4, 12, 4, "Kahmora");
    const kandym = new Queen("Kandy Muse", 9, 10, 5, 6, 7, 8, 14, "KandyM");
    const lala = new Queen("LaLa Ri", 5, 7, 10, 2, 6, 9, 14, "Lala");
    const olivia = new Queen("Olivia Lux", 11, 5, 11, 10, 8, 11, 8, "Olivia");
    const rose = new Queen("Rosé", 12, 11, 13, 8, 10, 10, 6, "Rose");
    const symone = new Queen("Symone", 14, 7, 7, 9, 12, 13, 13, "Symone");
    const tamisha = new Queen("Tamisha Iman", 7, 6, 7, 5, 6, 7, 7, "Tamisha");
    const tina = new Queen("Tina Burner", 6, 6, 10, 5, 6, 8, 9, "TinaB");
    const utica = new Queen("Utica Queen", 7, 4, 6, 15, 5, 12, 11, "Utica");
    const us_13_queens = [denali, elliott, mik, joey, kahmora, kandym, lala, olivia, rose, symone, tamisha, tina, utica];
    const us_13 = new Season("us_13", us_13_queens);

    // US 14
    const alyssaH = new Queen("Alyssa Hunter", 5, 6, 7, 10, 7, 13, 8, "AlyssaH");
    const angeria = new Queen("Angeria Paris VanMicheals", 11, 6, 9, 12, 8, 11, 8, "Angeria");
    const bosco = new Queen("Bosco", 11, 12, 6, 7, 12, 11, 6, "Bosco");
    const daya = new Queen("Daya Betty", 9, 8, 9, 9, 10, 10, 8, "DayaBetty");
    const deja = new Queen("DeJa Skye", 9, 7, 9, 8, 13, 8, 8, "DeJa");
    const jasmineK = new Queen("Jasmine Kennedie", 7, 6, 13, 7, 6, 10, 14, "JasmineK");
    const jorgeous = new Queen("Jorgeous", 5, 5, 13, 10, 5, 10, 15, "Jorgeous");
    const june = new Queen("June Jambalaya", 5, 6, 6, 4, 5, 6, 6, "June");
    const kerri = new Queen("Kerri Colby", 6, 6, 5, 5, 6, 9, 6, "Kerri");
    const kornbread = new Queen("Kornbread Jeté", 6, 7, 6, 6, 7, 8, 7, "Kornbread");
    const cadmen = new Queen("Lady Camden", 12, 11, 12, 11, 7, 10, 11, "LadyCamden");
    const maddy = new Queen("Maddy Morphosis", 8, 7, 6, 5, 6, 9, 7, "Maddy");
    const orion = new Queen("Orion Story", 4, 6, 6, 5, 6, 6, 5, "Orion");
    const willow = new Queen("Willow Pill", 11, 8, 7, 10, 10, 12, 8, "Willow");
    const us_14_queens = [alyssaH, angeria, bosco, daya, deja, jasmineK, jorgeous, june, kerri, kornbread, cadmen, maddy, orion, willow];
    const us_14 = new Season("us_14", us_14_queens);

    // US 15
    const amethyst = new Queen("Amethyst", 7, 7, 7, 7, 7, 7, 7, "Amethyst");
    const anetra = new Queen("Anetra", 7, 7, 7, 7, 7, 7, 7, "Anetra");
    const auraMayari = new Queen("Aura Mayari", 7, 7, 7, 7, 7, 7, 7, "AuraMayari");
    const irene = new Queen("Irene Dubois", 7, 7, 7, 7, 7, 7, 7, "IreneDubois");
    const jax = new Queen("Jax", 7, 7, 7, 7, 7, 7, 7, "Jax");
    const loosey = new Queen("Loosey LaDuca", 7, 7, 7, 7, 7, 7, 7, "LooseyLaDuca");
    const luxx = new Queen("Luxx Noir London", 7, 7, 7, 7, 7, 7, 7, "LuxxNoirLondon");
    const malaysia = new Queen("Malaysia Babydoll Foxx", 7, 7, 7, 7, 7, 7, 7, "MalaysiaBabydollFoxx");
    const marcia = new Queen("Marcia Marcia Marcia", 7, 7, 7, 7, 7, 7, 7, "MarciaMarciaMarcia");
    const mistress = new Queen("Mistress Isabelle Brooks", 7, 7, 7, 7, 7, 7, 7, "MistressIsabelleBrooks");
    const poppy = new Queen("Princess Poppy", 7, 7, 7, 7, 7, 7, 7, "PrincessPoppy");
    const robin = new Queen("Robin Fierce", 7, 7, 7, 7, 7, 7, 7, "RobinFierce");
    const salina = new Queen("Salina EsTitties", 7, 7, 7, 7, 7, 7, 7, "SalinaEsTitties");
    const sashaColby = new Queen("Sasha Colby", 7, 7, 7, 7, 7, 7, 7, "SashaColby");
    const spice = new Queen("Spice", 7, 7, 7, 7, 7, 7, 7, "Spice");
    const sugar = new Queen("Sugar", 7, 7, 7, 7, 7, 7, 7, "Sugar");
    const us_15_queens = [amethyst, anetra, auraMayari, irene, jax, loosey, luxx, malaysia, marcia, mistress, poppy, robin, salina, sashaColby, spice, sugar];
    const us_15 = new Season("us_15", us_15_queens);
    
    // UK 1
    const baga = new Queen("Baga Chipz", 13, 12, 5, 5, 13, 8, 7, "Baga");
    const blu = new Queen("Blu Hydrangea", 5, 9, 8, 10, 10, 12, 9, "Blu");
    const cheryl = new Queen("Cheryl Hole", 5, 5, 9, 5, 7, 7, 9, "Cheryl");
    const crystaluk = new Queen("Crystal", 6, 5, 6, 9, 4, 8, 6, "Crystal");
    const divina = new Queen("Divina De Campo", 11, 6, 9, 12, 9, 9, 9, "Divina");
    const gothy = new Queen("Gothy Kendoll", 4, 5, 4, 3, 5, 6, 4, "Gothy");
    const scaredy = new Queen("Scaredy Kat", 3, 5, 6, 4, 4, 7, 4, "Scaredy");
    const sumting = new Queen("Sum Ting Wong", 8, 6, 6, 7, 6, 9, 8, "Sum");
    const viv = new Queen("The Vivienne", 12, 13, 8, 10, 14, 11, 12, "TVivienne");
    const vinegar = new Queen("Vinegar Strokes", 7, 6, 6, 4, 4, 6, 6, "Vinegar");
    const uk_1_queens = [baga, blu, cheryl, crystaluk, divina, gothy, scaredy, sumting, viv, vinegar];
    const uk_1 = new Season("uk_1", uk_1_queens);
    
    // UK 2
    const awhora = new Queen("A'Whora", 7, 5, 8, 15, 10, 10, 8, "Awhora");
    const asttina = new Queen("Asttina Mandella", 6, 6, 13, 8, 6, 10, 12, "Asttina");
    const bimini = new Queen("Bimini", 11, 14, 10, 7, 11, 11, 11, "Bimini");
    const cherry = new Queen("Cherry Valentine", 5, 6, 5, 7, 6, 11, 4, "Cherry");
    const ellie = new Queen("Ellie Diamond", 10, 6, 7, 11, 8, 9, 8, "Ellie");
    const ginny = new Queen("Ginny Lemon", 6, 6, 5, 5, 5, 8, 4, "Ginny");
    const joe = new Queen("Joe Black", 5, 5, 4, 5, 4, 8, 5, "Joe");
    const lawrence = new Queen("Lawrence Chaney", 13, 12, 5, 12, 9, 11, 10, "Lawrence");
    const sister = new Queen("Sister Sister", 6, 8, 6, 4, 7, 8, 9, "Sister");
    const tayce = new Queen("Tayce", 10, 9, 10, 5, 9, 12, 14, "Tayce");
    const tia = new Queen("Tia Kofi", 7, 9, 9, 5, 8, 5, 10, "Tia");
    const veronica = new Queen("Veronica Green", 6, 6, 10, 6, 5, 7, 8, "Veronica");
    const uk_2_queens = [awhora, asttina, bimini, cherry, ellie, ginny, joe, lawrence, sister, tayce, tia, veronica];
    const uk_2 = new Season("uk_2", uk_2_queens);

    // UK 3
    const anubis = new Queen("Anubis", 5, 5, 5, 4, 5, 4, 4, "Anubis");
    const charity = new Queen("Charity Kase", 8, 7, 4, 10, 6, 13, 8, "Charity");
    const choriza = new Queen("Choriza May", 9, 9, 6, 7, 7, 8, 5, "Choriza");
    const elektraF = new Queen("Elektra Fence", 5, 6, 11, 4, 5, 8, 13, "ElektraF");
    const ella = new Queen("Ella Vaday", 9, 14, 8, 10, 12, 9, 8, "Ella");
    const kitty = new Queen("Kitty Scott-Claus", 12, 11, 7, 8, 9, 9, 7, "Kitty");
    const krystal = new Queen("Krystal Versace", 8, 8, 11, 12, 8, 14, 12, "Krystal");
    const river = new Queen("River Medway", 8, 6, 5, 9, 5, 7, 5, "River");
    const scarlett = new Queen("Scarlett Harlett", 7, 7, 8, 8, 6, 8, 7, "ScarlettH");
    const vanity = new Queen("Vanity Milan", 8, 6, 12, 7, 8, 8, 12, "Vanity");
    const victoriaS = new Queen("Victoria Scone", 11, 10, 8, 10, 8, 10, 10, "VictoriaS");
    const uk_3_queens = [anubis, charity, choriza, elektraF, ella, kitty, krystal, river, scarlett, vanity, victoriaS, veronica];
    const uk_3 = new Season("uk_3", uk_3_queens);

    // UK 4
    const baby = new Queen("Baby", 6, 6, 9, 10, 4, 9, 11, "Baby");
    const black = new Queen("Black Peppa", 5, 4, 8, 4, 6, 13, 13, "BlackPeppa");
    const cheddar = new Queen("Cheddar Gorgeous", 12, 9, 9, 8, 13, 14, 8, "Cheddar");
    const copper = new Queen("Copper Topp", 5, 4, 9, 7, 6, 7, 8, "Copper");
    const dakota = new Queen("Dakota Schiffer", 6, 9, 9, 10, 9, 11, 10, "Dakota");
    const danny = new Queen("Danny Beard", 12, 10, 11, 8, 11, 13, 9, "Danny");
    const jonbers = new Queen("Jonbers Blonde", 5, 10, 8, 7, 9, 9, 9, "Jonbers");
    const just = new Queen("Just May", 4, 4, 4, 4, 4, 4, 4, "JustMay");
    const leFil = new Queen("Le Fil", 6, 5, 8, 9, 5, 12, 9, "LeFil");
    const pixie = new Queen("Pixie Polite", 7, 5, 9, 8, 8, 9, 9, "PixiePolite");
    const sminty = new Queen("Sminty Drop", 5, 6, 5, 9, 4, 14, 8, "Sminty");
    const starlet = new Queen("Starlet", 4, 4, 4, 4, 4, 13, 5, "Starlet");
    const uk_4_queens = [baby, black, cheddar, copper, dakota, danny, jonbers, just, leFil, pixie, sminty, starlet];
    const uk_4 = new Season("uk_4", uk_4_queens);

    // CANADA 1 
    const anastarzia = new Queen("Anastarzia Anaquway", 7, 6, 4, 12, 6, 8, 7, "Starzy");
    const boa = new Queen("BOA", 6, 6, 5, 5, 6, 7, 7, "BOA");
    const ilona = new Queen("Ilona Verley", 5, 8, 5, 8, 9, 10, 10, "Ilona");
    const jimbo = new Queen("Jimbo", 10, 13, 2, 13, 15, 11, 2, "Jimbo");
    const juice = new Queen("Juice Boxx", 6, 6, 6, 4, 6, 6, 7, "Juice");
    const kiara = new Queen("Kiara", 10, 6, 8, 11, 6, 9, 11, "Kiara");
    const kyne = new Queen("Kyne", 8, 6, 6, 7, 6, 6, 7, "Kyne");
    const lemon = new Queen("Lemon", 10, 11, 12, 6, 11, 13, 11, "Lemon");
    const priyanka = new Queen("Priyanka", 14, 9, 12, 8, 6, 10, 13, "Priyanka");
    const rita = new Queen("Rita Baga", 11, 10, 9, 9, 8, 10, 12, "Rita");
    const bobo = new Queen("Scarlett BoBo", 6, 8, 9, 9, 9, 10, 9, "Scarlett");
    const tynomi = new Queen("Tynomi Banks", 5, 6, 5, 7, 5, 7, 10, "Tynomi");
    const canada_1_queens = [anastarzia, boa, ilona, jimbo, juice, kiara, kyne, lemon, priyanka, rita, bobo, tynomi];
    const canada_1 = new Season("canada_1", canada_1_queens);
    
    // CANADA 2
    const adriana = new Queen("Adriana", 9, 6, 7, 6, 6, 8, 5, "Adriana");
    const beth = new Queen("Beth", 5, 5, 6, 3, 6, 5, 4, "Beth");
    const eve = new Queen("Eve 6000", 10, 5, 5, 6, 6, 8, 8, "Eve");
    const giametric = new Queen("Gia Metric", 9, 6, 10, 6, 6, 9, 10, "Giametric");
    const icesis = new Queen("Icesis Couture", 8, 11, 9, 12, 10, 14, 12, "Icesis");
    const kendall = new Queen("Kendall Gender", 7, 9, 8, 6, 7, 8, 10, "Kendall");
    const kimoraA = new Queen("Kimora Amour", 6, 5, 5, 6, 7, 7, 5, "KimoraA");
    const oceane = new Queen("Océane Aqua-Black", 6, 7, 4, 7, 7, 7, 5, "Oceane");
    const pythia = new Queen("Pythia", 8, 7, 8, 12, 9, 12, 7, "Pythia");
    const stephanie = new Queen("Stephanie Prince", 6, 5, 6, 10, 5, 11, 6, "Stephanie");
    const suki = new Queen("Suki Doll", 8, 7, 6, 9, 5, 9, 5, "Suki");
    const synthia = new Queen("Synthia Kiss", 6, 8, 10, 7, 9, 7, 9, "Synthia");
    const canada_2_queens = [adriana, beth, eve, giametric, icesis, kendall, kimoraA, oceane, pythia, stephanie, suki, synthia];
    const canada_2 = new Season("canada_2", canada_2_queens);

    // CANADA 3
    const bombae = new Queen("Bombae", 5, 7, 6, 8, 6, 7, 7, "Bombae");
    const chelazon = new Queen("Chelazon Leroux", 4, 9, 4, 7, 5, 7, 6, "Chelazon");
    const gisele = new Queen("Gisèle Lullaby", 6, 10, 8, 11, 10, 12, 9, "Gisele");
    const halal = new Queen("Halal Bae", 4, 4, 3, 3, 4, 7, 5, "Halal");
    const irma = new Queen("Irma Gerd", 5, 7, 7, 8, 10, 9, 7, "Irma");
    const jadashada = new Queen("Jada Shada Hudson", 9, 7, 9, 8, 7, 10, 12, "JadaShada");
    const kaos = new Queen("Kaos", 5, 7, 5, 5, 5, 9, 9, "Kaos");
    const kimmy = new Queen("Kimmy Couture", 7, 7, 12, 9, 6, 11, 12, "Kimmy");
    const boomboom = new Queen("Lady Boom Boom", 5, 8, 9, 9, 6, 10, 9, "BoomBoom");
    const fiercalicious = new Queen("Miss Fiercalicious", 9, 9, 8, 7, 7, 11, 9, "Fiercalicious");
    const moco = new Queen("Miss Moço", 5, 4, 6, 4, 4, 7, 9, "Moco");
    const vanderpuss = new Queen("Vivian Vanderpuss", 9, 9, 9, 7, 8, 9, 8, "Vanderpuss");
    const canada_3_queens = [bombae, chelazon, gisele, halal, irma, jadashada, kaos, kimmy, boomboom, fiercalicious, moco, vanderpuss];
    const canada_3 = new Season("canada_3", canada_3_queens);

    // HOLLAND 1
    const chelsea = new Queen("Chelsea Boy", 9, 10, 7, 7, 10, 12, 6, "Chelsea");
    const envy = new Queen("Envy Peru", 11, 11, 11, 8, 11, 13, 11, "Envy");
    const janey = new Queen("Janey Jacké", 7, 6, 13, 11, 6, 11, 12, "Janey");
    const madamem = new Queen("Madame Madness", 8, 6, 5, 6, 5, 8, 7, "MadameM");
    const mama = new Queen("Ma'Ma Queen", 9, 6, 5, 6, 6, 10, 7, "Mama");
    const megan = new Queen("Megan Schoonbrood", 7, 6, 6, 5, 6, 9, 8, "Megan");
    const abby = new Queen("Miss Abby OMG", 5, 6, 11, 6, 5, 8, 10, "Abby");
    const patty = new Queen("Patty Pam-Pam", 5, 6, 6, 6, 5, 9, 7, "Patty");
    const roem = new Queen("Roem", 6, 6, 5, 5, 5, 6, 5, "Roem");
    const sederginne = new Queen("Sederginne", 7, 6, 6, 7, 5, 13, 5, "Sederginne");
    const holland_1_queens = [chelsea, envy, janey, madamem, mama, megan, abby, patty, roem, sederginne];
    const holland_1 = new Season("holland_1", holland_1_queens);
    
    // HOLLAND 2
    const ivyelise = new Queen("Ivy-Elyse", 6, 8, 5, 4, 8, 5, 10, "IvyE");
    const juicy = new Queen("Juicy Kouture", 5, 6, 5, 5, 4, 4, 5, "Juicy");
    const keta = new Queen("Keta Minaj", 9, 12, 9, 7, 12, 11, 9, "Keta");
    const love = new Queen("Love Masisi", 6, 5, 6, 8, 5, 10, 7, "Love");
    const mlp = new Queen("My Little Puny", 10, 10, 10, 7, 9, 10, 10, "MLP");
    const reggy = new Queen("Reggy B", 6, 6, 6, 5, 6, 8, 8, "Reggy");
    const tabitha = new Queen("Tabitha", 6, 7, 8, 6, 5, 7, 8, "Tabitha");
    const countess = new Queen("The Countess", 7, 5, 4, 10, 6, 12, 5, "Countess");
    const vanessaC = new Queen("Vanessa Van Cartier", 7, 5, 6, 8, 5, 12, 8, "VanessaC");
    const vivaldi = new Queen("Vivaldi", 8, 8, 8, 7, 8, 12, 8, "Vivaldi");
    const holland_2_queens = [ivyelise, juicy, keta, love, mlp, reggy, tabitha, countess, vanessaC, vivaldi];
    const holland_2 = new Season("holland_2", holland_2_queens);
    
    // THAILAND 1
    const amadiva = new Queen("Amadiva", 7, 6, 7, 9, 4, 9, 8, "Amadiva");
    const annee = new Queen("Anneé Maywong", 10, 9, 7, 12, 8, 11, 9, "Annee");
    const b = new Queen("B Ella", 11, 7, 6, 7, 7, 7, 7, "B");
    const bunny = new Queen("Bunny Be Fly", 6, 5, 5, 7, 5, 6, 5, "Bunny");
    const dearis = new Queen("Dearis Doll", 8, 11, 7, 8, 10, 10, 10, "Dearis");
    const jaja = new Queen("JAJA", 7, 5, 7, 6, 5, 9, 9, "Jaja");
    const meannie = new Queen("Meannie Minaj", 5, 5, 5, 4, 5, 5, 4, "Meannie");
    const morrigan = new Queen("Morrigan", 5, 4, 6, 4, 6, 7, 6, "Morrigan");
    const natalia = new Queen("Natalia Pliacam", 8, 12, 7, 9, 12, 10, 9, "Natalia");
    const petchra = new Queen("Petchra", 6, 5, 6, 8, 6, 7, 8, "Petchra");
    const thailand_1_queens = [amadiva, annee, b, bunny, dearis, jaja, meannie, morrigan, natalia, petchra];
    const thailand_1 = new Season("thailand_1", thailand_1_queens);
    
    // THAILAND 2
    const angele = new Queen("Angele Anang", 8, 8, 9, 11, 9, 9, 12, "Angele");
    const bandit = new Queen("Bandit", 7, 8, 7, 8, 7, 8, 7, "Bandit");
    const genie = new Queen("Genie", 10, 7, 7, 7, 8, 8, 7, "Genie");
    const kana = new Queen("Kana Warrior", 9, 7, 8, 6, 8, 7, 12, "Kana");
    const kandyz = new Queen("Kandy Zyanide", 7, 7, 10, 8, 9, 10, 8, "KandyZ");
    const katy = new Queen("Katy Killer", 6, 6, 7, 6, 7, 9, 6, "Katy");
    const m = new Queen("M Stranger Fox", 5, 6, 5, 6, 6, 5, 5, "M");
    const maya = new Queen("Maya B'Haro", 5, 6, 6, 8, 7, 8, 7, "Maya");
    const mocha = new Queen("Mocha Diva", 9, 9, 6, 8, 9, 7, 9, "Mocha");
    const gimhuay = new Queen("Miss Gimhuay", 8, 7, 7, 9, 8, 11, 8, "Gimhuay");
    const silver = new Queen("Silver Sonic", 5, 5, 6, 6, 5, 7, 6, "Silver");
    const srimala = new Queen("Srimala", 7, 10, 8, 8, 7, 7, 8, "Srimala");
    const tormai = new Queen("Tormai", 6, 5, 5, 6, 5, 7, 7, "Tormai");
    const vanda = new Queen("Vanda Miss Joaquim", 11, 10, 8, 8, 9, 9, 9, "Vanda");
    const thailand_2_queens = [angele, bandit, genie, kana, kandyz, katy, m, maya, mocha, gimhuay, silver, srimala, tormai, vanda];
    const thailand_2 = new Season("thailand_2", thailand_2_queens);

    // DOWN UNDER 1
    const anita = new Queen("Anita Wigl'it", 6, 9, 8, 6, 10, 8, 5, "Anita");
    const art = new Queen("Art Simone", 6, 4, 5, 8, 4, 10, 4, "Art");
    const cocoj = new Queen("Coco Jumbo", 6, 5, 6, 6, 5, 8, 10, "CocoJ");
    const elektra = new Queen("Elektra Shock", 10, 6, 12, 8, 4, 7, 11, "Elektra");
    const etc = new Queen("Etcetera Etcetera", 5, 8, 8, 7, 8, 8, 8, "Etc");
    const jojo = new Queen("Jojo Zaho", 5, 5, 5, 5, 5, 6, 6, "Jojo");
    const karen = new Queen("Karen From Finance", 5, 6, 5, 5, 7, 7, 5, "Karen");
    const kita = new Queen("Kita Mean", 9, 9, 7, 7, 9, 9, 8, "Kita");
    const maxi = new Queen("Maxi Shield", 6, 6, 5, 9, 7, 8, 8, "Maxi");
    const downunder_1_queens = [anita, art, cocoj, elektra, etc, jojo, karen, kita, maxi];
    const downunder_1 = new Season("downunder_1", downunder_1_queens);
    
    // DOWN UNDER 2
    const aubrey = new Queen("Aubrey Haive", 5, 4, 5, 7, 4, 8, 7, "Aubrey");
    const beverly = new Queen("Beverly Kills", 8, 4, 10, 9, 5, 9, 10, "Beverly");
    const faux = new Queen("Faúx Fúr", 4, 5, 4, 5, 4, 5, 6, "Faux");
    const hannah = new Queen("Hannah Conda", 11, 10, 8, 9, 9, 11, 8, "Hannah");
    const kweenKong = new Queen("Kween Kong", 5, 9, 10, 5, 8, 10, 11, "Kween");
    const minnie = new Queen("Minnie Cooper", 9, 8, 5, 6, 6, 9, 7, "Minnie");
    const molly = new Queen("Molly Poppinz", 8, 7, 6, 9, 7, 10, 9, "Molly");
    const pomara = new Queen("Pomara Fifth", 8, 5, 5, 7, 5, 9, 8, "Pomara");
    const spankie = new Queen("Spankie Jackzon", 11, 11, 8, 5, 8, 7, 9, "Spankie");
    const yuri = new Queen("Yuri Guaii", 6, 11, 6, 12, 9, 13, 7, "Yuri");
    const downunder_2_queens = [aubrey, beverly, faux, hannah, kweenKong, minnie, molly, pomara, spankie, yuri];
    const downunder_2 = new Season("downunder_2", downunder_2_queens);
    
    // ESPAÑA 1
    const arantxa = new Queen("Arantxa Castilla La Mancha", 6, 8, 6, 7, 8, 9, 7, "Arantxa");
    const carmenf = new Queen("Carmen Farala", 10, 10, 10, 14, 8, 13, 10, "CarmenF");
    const dovima = new Queen("Dovima Nurmi", 8, 7, 5, 7, 8, 10, 6, "Dovima");
    const drag = new Queen("Drag Vulcano", 6, 6, 5, 7, 6, 9, 6, "Drag");
    const hugaceo = new Queen("Hugáceo Crujiente", 5, 5, 5, 12, 6, 12, 8, "Hugaceo");
    const inti = new Queen("Inti", 6, 6, 6, 7, 5, 11, 6, "Inti");
    const killer = new Queen("Killer Queen", 6, 10, 8, 9, 11, 9, 8, "Killer");
    const pupi = new Queen("Pupi Poisson", 10, 11, 7, 5, 11, 6, 7, "Puppy");
    const sagittaria = new Queen("Sagittaria", 7, 8, 8, 9, 7, 10, 8, "Sagittaria");
    const macarena = new Queen("The Macarena", 5, 5, 6, 4, 5, 5, 5, "Macarena");
    const espana_1_queens = [arantxa, carmenf, dovima, drag, hugaceo, inti, killer, pupi, sagittaria, macarena];
    const espana_1 = new Season("espana_1", espana_1_queens);
    
    // ESPAÑA 2
    const arielRec = new Queen("Ariel Rec", 5, 5, 7, 4, 5, 9, 5, "ArielRec");
    const diamante = new Queen("Diamante Merybrown", 7, 6, 10, 5, 5, 8, 11, "Diamante");
    const sethlas = new Queen("Drag Sethlas", 7, 5, 9, 10, 5, 11, 7, "DragSethlas");
    const estrella = new Queen("Estrella Xtravaganza", 10, 7, 7, 5, 9, 8, 8, "Estrella");
    const jota = new Queen("Jota Carajota", 4, 5, 6, 4, 4, 8, 7, "Jota");
    const juriji = new Queen("Juriji Der Klee", 8, 9, 7, 9, 10, 10, 9, "Juriji");
    const marina = new Queen("Marina", 6, 10, 8, 7, 7, 8, 11, "Marina");
    const marisa = new Queen("Marisa Prisa", 4, 4, 3, 2, 4, 4, 4, "Marisa");
    const onyx = new Queen("Onyx", 6, 6, 7, 7, 6, 13, 7, "Onyx");
    const samantha = new Queen("Samantha Ballentines", 4, 4, 5, 5, 5, 5, 3, "Samantha");
    const sharonne = new Queen("Sharonne", 12, 10, 8, 8, 12, 10, 9, "Sharonne");
    const venedita = new Queen("Venedita Von Däsh", 9, 9, 9, 9, 9, 10, 9, "Venedita");
    const espana_2_queens = [arielRec, diamante, sethlas, estrella, jota, juriji, marina, marisa, onyx, samantha, sharonne, venedita];
    const espana_2 = new Season("espana_2", espana_2_queens);

    // ITALIA 1
    const ava = new Queen("Ava Hangar", 8, 7, 5, 5, 6, 6, 6, "Ava");
    const divinity = new Queen("Divinity", 9, 6, 8, 7, 6, 8, 7, "Divinity");
    const elecktra = new Queen("Elecktra Bionic", 7, 8, 8, 8, 9, 9, 8, "Elecktra");
    const enorma = new Queen("Enorma Jean", 8, 8, 6, 6, 8, 7, 6, "Enorma");
    const farida = new Queen("Farida Kant", 7, 6, 8, 11, 5, 11, 8, "Farida");
    const ivana = new Queen("Ivana Vamp", 6, 5, 6, 6, 6, 6, 5, "Ivana");
    const riche = new Queen("Le Riche", 6, 8, 6, 8, 9, 8, 7, "Riche");
    const luquisha = new Queen("Luquisha Lubamba", 7, 6, 6, 5, 7, 6, 7, "Luquisha");
    const italia_1_queens = [ava, divinity, elecktra, enorma, farida, ivana, riche, luquisha];
    const italia_1 = new Season("italia_1", italia_1_queens);
    
    // ITALIA 2
    const aura = new Queen("Aura Eternal", 11, 9, 9, 6, 5, 9, 8, "Aura");
    const gioffre = new Queen("Gioffré", 6, 8, 5, 7, 5, 8, 8, "Gioffre");
    const diamond = new Queen("La Diamond", 10, 12, 8, 12, 11, 13, 9, "LaDiamond");
    const petite = new Queen("La Petite Noire", 10, 5, 10, 8, 7, 11, 11, "Petite");
    const narciso = new Queen("Narciso", 4, 4, 4, 4, 4, 4, 4, "Narciso");
    const nehellenia = new Queen("Nehellenia", 8, 10, 10, 8, 10, 12, 9, "Nehellenia");
    const obama = new Queen("Obama", 5, 9, 6, 8, 9, 8, 8, "Obama");
    const panthera = new Queen("Panthera Virus", 7, 5, 6, 6, 5, 8, 9, "Panthera");
    const skandalove = new Queen("Skandalove", 9, 7, 8, 8, 7, 9, 9, "Skandalove");
    const tanissa = new Queen("Tanissa Yoncè", 5, 6, 6, 10, 6, 9, 7, "Tanissa");
    const italia_2_queens = [aura, gioffre, diamond, petite, narciso, nehellenia, obama, panthera, skandalove, tanissa];
    const italia_2 = new Season("italia_2", italia_2_queens);

    // FRANCE 1
    const elips = new Queen("Elips", 7, 9, 8, 8, 8, 8, 7, "Elips");
    const kam = new Queen("Kam Hugh", 7, 5, 6, 9, 4, 13, 7, "Kam");
    const bigbertha = new Queen("La Big Bertha", 7, 6, 7, 6, 6, 8, 9, "BigBertha");
    const briochee = new Queen("La Briochée", 6, 6, 6, 5, 6, 8, 5, "LaBriochee");
    const grandedame = new Queen("La Grande Dame", 11, 10, 8, 12, 8, 11, 8, "GrandeDame");
    const kahena = new Queen("La Kahena", 5, 6, 5, 3, 5, 6, 5, "Kahena");
    const lolita = new Queen("Lolita Banana", 9, 7, 13, 11, 6, 9, 12, "LolitaBanana");
    const lova = new Queen("Lova Ladiva", 5, 5, 6, 4, 6, 6, 5, "Lova");
    const paloma = new Queen("Paloma", 11, 11, 6, 7, 9, 9, 8, "Paloma");
    const soa = new Queen("Soa de Muse", 9, 10, 10, 8, 8, 9, 10, "Soa");
    const france_1_queens = [elips, kam, bigbertha, briochee, grandedame, kahena, lolita, lova, paloma, soa];
    const france_1 = new Season("france_1", france_1_queens);
    
    // PHILIPPINES 1
    const brigiding = new Queen("Brigiding", 6, 5, 8, 8, 4, 9, 10, "Brigiding");
    const corazon = new Queen("Corazon", 4, 5, 4, 3, 4, 7, 5, "Corazon");
    const eva = new Queen("Eva Le Queen", 6, 9, 8, 7, 8, 10, 8, "EvaLeQueen");
    const gigiEra = new Queen("Gigi Era", 5, 5, 4, 5, 5, 6, 7, "GigiEra");
    const morgana = new Queen("Lady Morgana", 6, 6, 7, 7, 5, 8, 11, "LadyMorgana");
    const marinaSummers = new Queen("Marina Summers", 6, 9, 12, 9, 10, 12, 10, "MarinaSummers");
    const minty = new Queen("Minty Fresh", 6, 5, 4, 12, 4, 11, 9, "MintyFresh");
    const precious = new Queen("Precious Paula Nicole", 8, 8, 10, 7, 9, 9, 9, "PreciousPaulaNicole");
    const prince = new Queen("Prince", 4, 4, 4, 4, 4, 7, 4, "Prince");
    const turing = new Queen("Turing", 6, 6, 9, 6, 6, 7, 9, "Turing");
    const vinas = new Queen("Viñas DeLuxe", 6, 8, 8, 10, 8, 11, 7, "VinasDeLuxe");
    const xilhouete = new Queen("Xilhouete", 6, 10, 6, 8, 11, 10, 8, "Xilhouete");
    const philippines_1_queens = [brigiding, corazon, eva, gigiEra, morgana, marinaSummers, minty, precious, prince, turing, vinas, xilhouete];
    const philippines_1 = new Season("philippines_1", philippines_1_queens);

    // ALL STARS 1
    const allstars_1_queens = [alexis, chad, jujubee, latrice, manila, mimi, ninaf, pandora, raven, shannel, tammie, yara];
    const allstars_1 = new Season("allstars_1", allstars_1_queens);

    // ALL STARS 2
    const allstars_2_queens = [adore, alaska, alyssa, coco, detox, ginger, katya, phiphi, roxxxy, tatianna];
    const allstars_2 = new Season("allstars_2", allstars_2_queens);

    // ALL STARS 3
    const allstars_3_queens = [aja, bebe, bendelacreme, chichi, kennedy, milk, morgan, shangela, thorgy, trixie];
    const allstars_3 = new Season("allstars_3", allstars_3_queens);

    // ALL STARS 4
    const allstars_4_queens = [farrah, gia, jasmine, latrice, manila, monet, monique, naomi, trinity, valentina];
    const allstars_4 = new Season("allstars_4", allstars_4_queens);

    // ALL STARS 5
    const allstars_5_queens = [alexis, blair, derrick, india, jujubee, mariah, mayhem, miz, ongina, shea];
    const allstars_5 = new Season("allstars_5", allstars_5_queens);

    // ALL STARS 6
    const allstars_6_queens = [akeria, eureka, ginger, jan, jiggly, pandora, rajah, scarlet, serena, silky, sonique, trinityk, yara];
    const allstars_6 = new Season("allstars_6", allstars_6_queens);

    // ALL STARS 7
    const allstars_7_queens = [raja, jinkx, yvie, jaida, trinity, monet, shea, viv];
    const allstars_7 = new Season("allstars_7", allstars_7_queens);

    // VS THE WORLD
    const pangina = new Queen("Pangina Heals", 9, 7, 14, 11, 8, 13, 14, "Pangina");
    const ukvstw_queens = [baga, blu, cheryl, janey, jimbo, jujubee, lemon, monique, pangina];
    const ukvstw = new Season("ukvstw", ukvstw_queens);
    const canadavstw_queens = [anita, icesis, kendall, rajah, rita, silky, stephanie, victoriaS, vanity];
    const canadavstw = new Season("canadavstw", canadavstw_queens);

    let allQueens: Array<Queen> = array.concat([], us_1_queens, us_2_queens, us_3_queens, us_4_queens, us_5_queens, us_6_queens, us_7_queens, us_8_queens, us_9_queens, us_10_queens, us_11_queens, us_12_queens, us_13_queens, us_14_queens, us_15_queens, uk_1_queens, uk_2_queens, uk_3_queens, uk_4_queens, canada_1_queens, canada_2_queens, canada_3_queens, holland_1_queens, holland_2_queens, thailand_1_queens, thailand_2_queens, downunder_1_queens, downunder_2_queens, espana_1_queens, espana_2_queens, italia_1_queens, italia_2_queens, france_1_queens, philippines_1_queens, pangina);
    let allSeasons: Array<Season> = [us_1, us_2, us_3, us_4, us_5, us_6, us_7, us_8, us_9, us_10, us_11, us_12, us_13, us_14, us_15, uk_1, uk_2, uk_3, uk_4, canada_1, canada_2, canada_3, holland_1, holland_2, thailand_1, thailand_2, downunder_1, downunder_2, espana_1, espana_2, italia_1, italia_2, france_1, philippines_1, allstars_1, allstars_2, allstars_3, allstars_4, allstars_5, allstars_6, allstars_7, ukvstw, canadavstw];

    allQueens = array.uniq(allQueens);
    allQueens = sortQueensByName(allQueens);
    return { queens: allQueens, seasons: allSeasons };

    // commenting out custom shit for now
    /* let allCustomQueens = [];
    if (localStorage.getItem("customQueens") != null)
        allCustomQueens = JSON.parse(localStorage.getItem("customQueens") || "{}");
    let customLength = allCustomQueens.length;
    for (let i = 0; i < customLength; i++) {
        let queen = new Queen('', 0, 0, 0, 0, 0, 0, 0, '');
        Object.assign(queen, allCustomQueens[i]);
        allCustomQueens.push(queen);
    }
    allCustomQueens.splice(0, customLength);
    allQueens.concat(allCustomQueens).sort((a, b) => a.getName().toLowerCase().localeCompare(b.getName().toLowerCase())); */
}
