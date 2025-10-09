import React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import TopBar from "./TopBar";
import EditorPanel from "./EditorPanel";
import InputPanel from "./InputPanel";
import OutputPanel from "./OutputPanel";

export default function Shell() {
  return (
    <div className="relative z-0 min-h-screen flex flex-col">
      <TopBar />
      <div className="flex-1 px-3 pb-3">
        <div className="h-[calc(96vh-72px)]">
          <PanelGroup direction="horizontal">
            <Panel defaultSize={55} minSize={35}>
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl h-full p-2">
                <EditorPanel />
              </div>
            </Panel>
            <PanelResizeHandle className="w-2 mx-1 bg-white/5 rounded hover:bg-white/10 transition-colors" />
            <Panel defaultSize={45} minSize={25}>
              <PanelGroup direction="vertical">
                <Panel defaultSize={45} minSize={20}>
                  <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl h-full p-3">
                    <InputPanel />
                  </div>
                </Panel>
                <PanelResizeHandle className="h-2 my-1 bg-white/5 rounded hover:bg-white/10 transition-colors" />
                <Panel defaultSize={55} minSize={30}>
                  <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl h-full p-3">
                    <OutputPanel />
                  </div>
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </div>
  );
}
