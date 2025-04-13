import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Congratulations, your extension 'athkari' is now active!");

  vscode.window.showInformationMessage("🚀 بسم الله الرحمن الرحيم");

  // List to store the Athkar and I used ( globalState ) to store the Athkar that user will add .. in other words => ( globalState ) is instead os database ..
  let ListOfAdkhar: string[] = context.globalState.get("ListOfAdkhar", [
    "سبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر",
    "سبحان الله وبحمده، عدد خلقِه، ورضا نفسه، وزنة عرشه، ومداد كلماته",
    "سُبحان الله وبحمده، سبحان الله العظيم",
    "لا حول ولا قوة إلا بالله",
    "اللهم صل وسلم وبارك على سيدنا محمد وعلى آله وصحبه أجمعين",
    "اللهمَّ أنت ربي، لا إله إلا أنت، خلقتَني وأنا عبدُك، وأنا على عهدك ووعدك ما استطعتُ، أعوذ بك من شرِّ ما صنعتُ، أبوء لك بنعمتك عليَّ، وأبوء بذنبي، فاغفر لي، فإنه لا يغفر الذنوب إلا أنت",
    "لا إله إلا الله وحدة لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
    "اللهم ربنا لك الحمد، ملء السماوات وملء الأرض، وملء ما شئت من شيء بعد أهل الثناء والمجد، لا مانع لما أعطيت، ولا معطي لما منعت ولا ينفع ذا الجد منك الجد",
    "اللهم إني أعوذ بك من الهم والحزن، وأعوذ بك من العجز والكسل، وأعوذ بك من الجبن والبخل،وأعوذ بك  من غلبة الدين، وقهر الرجال",
    "اللهم إني أعوذ بك من شر ما عملت، ومن شر ما لم أعمل ",
    "اللهم إني أسألك الهدى والتقى والعفاف والغنى",
    "اللهم إنك عفو كريم تُحب العفو فاعف عني",
    "اللهم إني أسألك الجنة وما قرب إليها من قول أو عمل، وأعوذ بك من النار وما قرب إليها من قول أو عمل",
    " اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً",
    "اللهم اغفر لي ولوالدي وللمؤمنين والمؤمنات والمسلمين والمسلمات الأحياء منهم والأموات",
    "لا إله أنت سبحانك إني كنت من الظالمين",
    "ربِ إني لما أنزلت إلي من خير فقير",
    "ربِّ اغفر لي، وارحمني، وأنت خير الراحمين",
    "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار",
    "ربِّ اجعلني مقيم الصلاة ومن ذريتي، ربنا وتقبل دعاء",
    "حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم",
    "سبحانك اللهم وبحمدك، أشهد أن لا إله إلا أنت، أستغفرك وأتوب إليك",
    "سبحان الله عدد ما خلق",
    "سبحان الله عدد ما في السماوات والأرض",
    "سبحان الله ملء ما خلق",
    "الحمد لله عدد ماخلق",
    "الحمد لله ملء ما خلق",
  ]);

  const saveAdkhar = () => {
    context.globalState.update("ListOfAdkhar", ListOfAdkhar);
  };

  // I used getRandomNumber to get a random number between 0 and the length of the list ..
  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Get saved time or use default
  let newTime: number = context.globalState.get("AdkharIntervalMinutes", 30); // Default value in minutes
  let time = newTime * 60000;
  let interval: NodeJS.Timeout;

  // I used setInterval to show the Adkhar every 30 minutes ..
  const startInterval = () => {
    interval = setInterval(() => {
      const indexOfList = getRandomNumber(0, ListOfAdkhar.length - 1);
      vscode.window.showInformationMessage(ListOfAdkhar[indexOfList] + " :🔔");
    }, time);
  };

  startInterval(); // Start the first interval on extension activation

  // when user press ( Shift + Alt + P ) and enter command ( athkari ) the below options will be shown ..
  const disposable = vscode.commands.registerCommand(
    "athkari.athkari",
    async () => {
      const selection = await vscode.window.showQuickPick(
        ["تعديل الوقت", "إضافة ذكر جديد", "تحديث"],
        {
          placeHolder: "اختر من القائمة",
        }
      );

      // Edit showing new thiker time ..
      if (selection === "تعديل الوقت") {
        const inputTime = await vscode.window.showInputBox({
          placeHolder: "أدخل التوقيت الجديد هنا...",
          prompt:
            "أدخل عدد الدقائق التي ترغب أن يظهر فيها ذكر جديد تلقائيًا. مثال: إذا أدخلت 30، سيظهر ذكر كل 30 دقيقة.",
        });

        if (inputTime !== undefined) {
          const parsedTime = parseInt(inputTime, 10);
          if (!isNaN(parsedTime)) {
            newTime = parsedTime;
            time = newTime * 60000; // Update the interval time
            clearInterval(interval); // Clear the old interval
            startInterval(); // Start new interval with updated time

            // Save time to globalState
            context.globalState.update("AdkharIntervalMinutes", newTime);

            vscode.window.showInformationMessage(
              `✅ تم تعديل الوقت إلى ${newTime} دقيقة`
            );
          } else {
            vscode.window.showErrorMessage("❌ الرجاء إدخال رقم صحيح.");
          }
        }
      }

      // Add new dhikr to the list ..
      if (selection === "إضافة ذكر جديد") {
        const newDhikr = await vscode.window.showInputBox({
          placeHolder: "أدخل الذكر الجديد هنا...",
          prompt: "سيتم إضافته إلى قائمة الأذكار",
        });

        if (newDhikr) {
          ListOfAdkhar.push(newDhikr);
          saveAdkhar(); // حفظ الأذكار بعد الإضافة
          vscode.window.showInformationMessage(
            `✅ تم إضافة الذكر الجديد: "${newDhikr}"`
          );
        }
      }

      // Re
      if (selection === "تحديث") {
        vscode.window.showInformationMessage("تم التحديث بنجاح");
        vscode.window.showInformationMessage("أهلاً بك في أذكاري");
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
