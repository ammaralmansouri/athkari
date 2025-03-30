import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Congratulations, your extension 'athkari' is now active!");

  vscode.window.showInformationMessage("🚀 بسم الله الرحمن الرحيم");

  // استرجاع الأذكار المخزنة
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
  ]);

  const saveAdkhar = () => {
    context.globalState.update("ListOfAdkhar", ListOfAdkhar);
  };

  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  setInterval(() => {
    const indexOfList = getRandomNumber(0, ListOfAdkhar.length - 1);
    vscode.window.showInformationMessage(ListOfAdkhar[indexOfList] + " :🔔");
  }, 10000);

  const disposable = vscode.commands.registerCommand(
    "athkari.athkari",
    async () => {
      const selection = await vscode.window.showQuickPick(
        ["إضافة ذكر جديد", "تحديث"],
        {
          placeHolder: "اختر من القائمة",
        }
      );

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

      if (selection === "تحديث") {
        vscode.window.showInformationMessage("تم التحديث بنجاح");
        vscode.window.showInformationMessage("أهلاً بك في أذكار");
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
