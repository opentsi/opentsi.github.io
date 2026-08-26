import{_}from"./_plugin-vue_export-helper.DlAUqK2U.js";import{c as r,a as e,g as c,F as m,r as p,t as i,e as h,h as x,f as a,n as b,d as f,b as g}from"./runtime-core.esm-bundler.ZJIV3jxP.js";const k=h({__name:"CodeExample",setup(u,{expose:o}){o();const n=x("read"),t=x("init"),d={activeTabOts:n,activeTabDelo:t,otsExamples:{read:`# Read the latest version of a time series
library(opentimeseries)

ts_data <- read_open_ts(
  "leading",
  remote_archive = "opentsi/ch.kof.globalbaro"
)`,vintage:`# Read a specific vintage by date
library(opentimeseries)

# Get data as it was published on a specific date
ts_historical <- read_open_ts(
  "leading",
  date = "2023-07-01",
  remote_archive = "opentsi/ch.kof.globalbaro"
)`,history:`# Browse revision history
library(opentimeseries)

# Get the last 5 vintages of a series
history <- read_history(
  "leading",
  remote_archive = "opentsi/ch.kof.globalbaro",
  lastn = 5
)`},deloExamples:{init:`# Initialize a new archive
library(deloRean)

archive_init(
  archive_name = "ch.provider.dataset",
  parent_dir = "~/opentsi/"
)`,import:`# Import historical vintages
library(deloRean)

archive_import_history(
  vintages_dt,
  repository_path = "~/opentsi/ch.provider.dataset/"
)`},otsTabs:[{key:"read",label:"Read Latest"},{key:"vintage",label:"Read Vintage"},{key:"history",label:"History"}],deloTabs:[{key:"init",label:"Initialize"},{key:"import",label:"Import"}]};return Object.defineProperty(d,"__isScriptSetup",{enumerable:!1,value:!0}),d}}),T={id:"get-started",class:"py-24 sm:py-32 bg-muted/30"},w={class:"container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"},R={class:"grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto overflow-hidden"},C={class:"code-window flex flex-col min-w-0"},E={class:"flex items-center border-b border-border bg-muted/20"},O=["onClick"],S={key:0,class:"absolute bottom-0 left-0 right-0 h-0.5 bg-primary"},D={class:"p-6 font-mono text-sm bg-card/50 flex-1 overflow-x-auto"},I={class:"text-foreground leading-relaxed"},V={class:"code-window flex flex-col min-w-0"},B={class:"flex items-center border-b border-border bg-muted/20"},N=["onClick"],j={key:0,class:"absolute bottom-0 left-0 right-0 h-0.5",style:{"background-color":"oklch(0.65 0.22 310)"}},z={class:"p-6 font-mono text-sm bg-card/50 flex-1 overflow-x-auto"},F={class:"text-foreground leading-relaxed"};function G(u,o,n,t,v,y){return a(),r("section",T,[e("div",w,[o[4]||(o[4]=e("div",{class:"text-center space-y-4 mb-16"},[e("h2",{class:"text-4xl sm:text-5xl font-bold tracking-tight"},[e("span",{class:"bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"}," Open Time Series Initiative Toolbox ")]),e("p",{class:"text-xl text-muted-foreground max-w-2xl mx-auto"}," Two R packages. One for consuming data, one for managing it. ")],-1)),e("div",R,[e("div",C,[o[0]||(o[0]=c('<div class="px-6 py-5 border-b border-border bg-muted/30"><div class="flex items-center justify-between mb-1"><span class="font-mono text-lg font-semibold text-primary"> opentimeseries </span><span class="text-xs px-2.5 py-1 rounded-full border border-primary/30 text-primary bg-primary/10 font-medium"> for consumers </span></div><p class="text-sm text-muted-foreground"> Read, query, and explore time series data from any OpenTSI archive. </p></div>',1)),e("div",E,[(a(),r(m,null,p(t.otsTabs,s=>e("button",{key:s.key,onClick:l=>t.activeTabOts=s.key,class:b(["px-5 py-3 text-sm font-medium transition-colors relative",t.activeTabOts===s.key?"text-primary":"text-muted-foreground hover:text-foreground"])},[f(i(s.label)+" ",1),t.activeTabOts===s.key?(a(),r("div",S)):g("",!0)],10,O)),64))]),e("div",D,[e("pre",I,[e("code",null,i(t.otsExamples[t.activeTabOts]),1)])]),o[1]||(o[1]=e("div",{class:"px-6 py-4 border-t border-border bg-muted/20"},[e("span",{class:"text-xs text-muted-foreground mr-2"},"install"),e("code",{class:"text-xs font-mono text-foreground/70"},'remotes::install_github("opentsi/opentimeseries")')],-1))]),e("div",V,[o[2]||(o[2]=c(`<div class="px-6 py-5 border-b border-border bg-muted/30"><div class="flex items-center justify-between mb-1"><span class="font-mono text-lg font-semibold" style="color:oklch(0.65 0.22 310);"> deloRean </span><span class="text-xs px-2.5 py-1 rounded-full border font-medium" style="color:oklch(0.65 0.22 310);background-color:oklch(
                                        0.65 0.22 310 / 0.1
                                    );border-color:oklch(0.65 0.22 310 / 0.3);"> for providers </span></div><p class="text-sm text-muted-foreground"> Set up and manage archives with full revision history. Time travel included. </p></div>`,1)),e("div",B,[(a(),r(m,null,p(t.deloTabs,s=>e("button",{key:s.key,onClick:l=>t.activeTabDelo=s.key,class:b(["px-5 py-3 text-sm font-medium transition-colors relative",t.activeTabDelo===s.key?"text-foreground":"text-muted-foreground hover:text-foreground"])},[f(i(s.label)+" ",1),t.activeTabDelo===s.key?(a(),r("div",j)):g("",!0)],10,N)),64))]),e("div",z,[e("pre",F,[e("code",null,i(t.deloExamples[t.activeTabDelo]),1)])]),o[3]||(o[3]=e("div",{class:"px-6 py-4 border-t border-border bg-muted/20"},[e("span",{class:"text-xs text-muted-foreground mr-2"},"install"),e("code",{class:"text-xs font-mono text-foreground/70"},'remotes::install_github("opentsi/deloRean")')],-1))])])])])}const H=_(k,[["render",G]]);export{H as default};
