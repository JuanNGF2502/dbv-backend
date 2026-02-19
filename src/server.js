"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = require("fastify");
require("./database/db");
var desbravador_schema_1 = require("./schemas/desbravador.schema");
var prisma_1 = require("./lib/prisma");
var fastify = (0, fastify_1.default)({ logger: true });
fastify.get("/desbravadores", function () { return __awaiter(void 0, void 0, void 0, function () {
    var desbravadores;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.desbravador.findMany({
                    orderBy: { createdAt: "desc" },
                })];
            case 1:
                desbravadores = _a.sent();
                return [2 /*return*/, desbravadores];
        }
    });
}); });
fastify.post("/desbravadores", function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var parsed, desbravador;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                parsed = desbravador_schema_1.desbravadorSchema.safeParse(request.body);
                if (!parsed.success) {
                    reply.code(400);
                    return [2 /*return*/, { erro: "Dados inválidos", detalhes: parsed.error.format() }];
                }
                return [4 /*yield*/, prisma_1.prisma.desbravador.create({
                        data: parsed.data,
                    })];
            case 1:
                desbravador = _a.sent();
                return [2 /*return*/, { sucesso: true, desbravador: desbravador }];
        }
    });
}); });
fastify.put("/desbravadores/:id", function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var id, parsed, existe, desbravador;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Number(request.params.id);
                parsed = desbravador_schema_1.desbravadorSchema.safeParse(request.body);
                if (!parsed.success) {
                    reply.code(400);
                    return [2 /*return*/, { erro: "Dados inválidos", detalhes: parsed.error.format() }];
                }
                return [4 /*yield*/, prisma_1.prisma.desbravador.findUnique({
                        where: { id: id },
                    })];
            case 1:
                existe = _a.sent();
                if (!existe) {
                    reply.code(404);
                    return [2 /*return*/, { erro: "Desbravador não encontrado" }];
                }
                return [4 /*yield*/, prisma_1.prisma.desbravador.update({
                        where: { id: id },
                        data: parsed.data,
                    })];
            case 2:
                desbravador = _a.sent();
                return [2 /*return*/, desbravador];
        }
    });
}); });
fastify.delete("/desbravadores/:id", function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var id, existe;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Number(request.params.id);
                return [4 /*yield*/, prisma_1.prisma.desbravador.findUnique({
                        where: { id: id },
                    })];
            case 1:
                existe = _a.sent();
                if (!existe) {
                    reply.code(404);
                    return [2 /*return*/, { erro: "Desbravador não encontrado" }];
                }
                return [4 /*yield*/, prisma_1.prisma.desbravador.delete({
                        where: { id: id },
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, { sucesso: true }];
        }
    });
}); });
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fastify.listen({ port: 3000 })];
            case 1:
                _a.sent();
                console.log("Servidor rodando em http://192.168.0.155:3000");
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                fastify.log.error(err_1);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
start();
