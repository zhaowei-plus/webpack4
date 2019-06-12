module.exports = {
  'GET /api/v2/info': (req, res) => {
    const { id } = req.params;

    return res.json({
      id,
      name: '张三',
      age: 26,
      school: '浙江大学',
    });
  },
  'POST /api/login/account': (req, res) => {
    const { password, username } = req.body;

    return res.json({
      status: 'ok',
      code: 0,
      token: "sdfsdfsdfdsf",
      data: {
        id: 1,
        username: 'kenny',
        sex: 6
      }
    });
  },
};
