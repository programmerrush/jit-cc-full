import React from "react";
import { useCompilerStore } from "../store/useCompilerStore";
import { motion } from "framer-motion";
import RunButtons from "./RunButtons";
import { LANGUAGES, THEMES } from "../lib/languageMap";
import { Code2 } from "lucide-react";

export default function TopBar() {
  const { languageId, setLanguageId, theme, setTheme, setSource } =
    useCompilerStore();

  const helloWorldCodes = {
    45: `section .text
global _start
_start:
    mov r0, 1
    mov r1, msg
    mov r2, 13
    mov r7, 4
    svc 0
    mov r7, 1
    svc 0
msg: db 'Hello World', 10`,
    46: `echo "Hello World"`,
    47: `PRINT "Hello World"`,
    104: `#include <stdio.h>
int main() {
    printf("Hello World\\n");
    return 0;
}`,
    110: `#include <stdio.h>
int main() {
    printf("Hello World\\n");
    return 0;
}`,
    75: `#include <stdio.h>
int main() {
    printf("Hello World\\n");
    return 0;
}`,
    76: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello World" << endl;
    return 0;
}`,
    103: `#include <stdio.h>
int main() {
    printf("Hello World\\n");
    return 0;
}`,
    105: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello World" << endl;
    return 0;
}`,
    48: `#include <stdio.h>
int main() {
    printf("Hello World\\n");
    return 0;
}`,
    52: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello World" << endl;
    return 0;
}`,
    49: `#include <stdio.h>
int main() {
    printf("Hello World\\n");
    return 0;
}`,
    53: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello World" << endl;
    return 0;
}`,
    50: `#include <stdio.h>
int main() {
    printf("Hello World\\n");
    return 0;
}`,
    54: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello World" << endl;
    return 0;
}`,
    86: `(def main):
  print("Hello World")`,
    51: `using System;
class Program {
  static void Main() {
    Console.WriteLine("Hello World");
  }
}`,
    77: `DISPLAY "Hello World"`,
    55: `(def main):
  (print "Hello World")`,
    90: `void main() {
    print("Hello World");
}`,
    56: `import std.stdio;
void main() {
    writeln("Hello World");
}`,
    57: `IO.puts("Hello World")`,
    58: `io:format("Hello World~n").`,
    44: `echo "Hello World"`,
    87: `open System
printfn "Hello World"`,
    59: `program HelloWorld;
begin
  writeln('Hello World');
end.`,
    60: `fmt.Println("Hello World")`,
    95: `fmt.Println("Hello World")`,
    106: `fmt.Println("Hello World")`,
    107: `fmt.Println("Hello World")`,
    88: `println "Hello World"`,
    61: `main = putStrLn "Hello World"`,
    96: `System.out.println("Hello World");`,
    91: `System.out.println("Hello World");`,
    62: `System.out.println("Hello World");`,
    63: `console.log("Hello World")`,
    93: `console.log("Hello World")`,
    97: `console.log("Hello World")`,
    102: `console.log("Hello World")`,
    78: `fun main() {
    println("Hello World")
}`,
    111: `fun main() {
    println("Hello World")
}`,
    64: `print("Hello World")`,
    89: `// Multi-file Hello World`,
    79: `#include <stdio.h>
int main() {
    printf("Hello World\\n");
    return 0;
}`,
    65: `let greeting = "Hello World"; println(greeting)`,
    66: `disp('Hello World')`,
    67: `begin
  writeln('Hello World');
end.`,
  };

  const handleLanguageChange = (e) => {
    const newLanguageId = Number(e.target.value);
    setLanguageId(newLanguageId);
    setSource(helloWorldCodes[newLanguageId] || "");
  };

  return (
    <div className="sticky top-0 z-10">
      <div className="mx-3 mt-3 mb-2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="p-2 rounded-xl bg-white/10"
          >
            <Code2 className="text-indigo-300" size={24} />
          </motion.div>
          <div>
            <div className="text-lg font-semibold text-white">
              ESM Code Compiler
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            className="bg-black/50 backdrop-blur-xl border border-white/30 rounded-lg px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors"
            value={languageId}
            onChange={handleLanguageChange}
          >
            {LANGUAGES.map((l) => (
              <option
                key={l.id}
                value={l.id}
                className="bg-gray-900 text-white"
              >
                {l.label}
              </option>
            ))}
          </select>

          <select
            className="bg-black/50 backdrop-blur-xl border border-white/30 rounded-lg px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            {THEMES.map((t) => (
              <option
                key={t.id}
                value={t.id}
                className="bg-gray-900 text-white"
              >
                {t.label}
              </option>
            ))}
          </select>

          <RunButtons />
        </div>
      </div>
    </div>
  );
}
