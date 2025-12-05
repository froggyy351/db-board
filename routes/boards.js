const express = require('express');
const router = express.Router();

const ps = require('@prisma/client');
const prisma = ps.PrismaClient();

const pnum = 5; //１ページあたりの表示数

//ログインのチェック
function check(req, res) {
    if (req.session.login == null) {
        req.session.back = '/boards';
        res.redirect('/users/login');
        return true;
    } else {
        return false;
    }
} 

//トップページ
router.get('/', (req, res, next) => {
    res.redirect('/boards/0');
});

//トップページに番号をつけてアクセス
router.get('/:page', (req, res, next) => {
    if (check(req, res)) { return };
    const pg = +req.params.page;
    prisma.Board.findMany({
        skip: pg * pnum,
    })
});