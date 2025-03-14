import {createServer} from "http";
import {readFileSync} from "fs";
import {join} from "path";

(
    (
        cwd,
        port
    ) => {
        var
            htmlpath = join(cwd, "test/.html"),
            htmlh = { "Content-Type": "text/html" },
            
            jsh = { "Content-Type": "text/javascript" },
            jsp = join(cwd, "test/.js"),

            icoh = {"Content-Type":"image/x-icon"},
            icop = join(cwd, "test/favicon.ico"),

            cssh = {"Content-Type":"text/css"},
            cssp = join(cwd, "test/.css"),

            glslp = join(cwd, "src/glsl"),

            glslp_frag = join(glslp, ".frag"),
            glslp_vert = join(glslp, ".vert")
        ;
        
        return createServer((Q, S) => {
            var
                u = Q.url
            ;
            return (
                u === "/"
                ? (
                    S
                    .writeHead(200, htmlh)
                    .end(
                        readFileSync(htmlpath, "utf8")
                        .replace(
                            "{{glsl}}",
                            (
                                `[[${JSON.stringify(readFileSync(glslp_vert, "utf8"))}],`
                                +`[${JSON.stringify(readFileSync(glslp_frag, "utf8"))}]]`
                            )
                        )
                    )
                )
                :
                u === "/favicon.ico"
                ? S.writeHead(200, icoh).end(readFileSync(icop))
                :
                u === "/css"
                ? S.writeHead(200, cssh).end(readFileSync(cssp))
                :
                u === "/js"
                ? S.writeHead(200,jsh).end(readFileSync(jsp))
                :
                u.startsWith("/test")
                ? S.writeHead(200,jsh).end(readFileSync(join(cwd, "test/js"+u.substring(5))))
                : S.writeHead(200,jsh).end(readFileSync(join(cwd, "src"+u)))
            )
        })
        .listen(port, () => console.log(port));
        

    }
)(
    process.cwd(),
    2000
);

