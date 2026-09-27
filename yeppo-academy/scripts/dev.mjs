import {spawn} from "node:child_process";

const args=process.argv.slice(2);
const value=(names,fallback)=>{
 const index=args.findIndex(x=>names.includes(x));
 return index<0?fallback:args[index+1]||fallback;
};
const host=value(["--host","--hostname","-H"],"0.0.0.0");
const port=value(["--port","-p"],"3000");
const child=spawn(process.execPath,["node_modules/next/dist/bin/next","dev","-H",host,"-p",port],{stdio:"inherit"});
for(const signal of ["SIGTERM","SIGINT"])process.on(signal,()=>child.kill(signal));
child.on("exit",code=>process.exit(code??0));
