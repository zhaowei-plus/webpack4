/**
 * 接口代理转发
 * 针对多个域名，分别进行接口转发
 */

const domainTable = {
  dev: 'dev-debug.cai-inc.com',
  test: 'test.cai-inc.com',
  test8: 'test8.cai-inc.com',
  staging: 'staging.zcy.gov.cn',
};

const domain = domainTable.test;

module.exports = {
  useMockStatusCode: [404, 403, 500, 502], // number[]
  rules: {
    // 用户
    uaa: {
      host: `http://login.${domain}`,
      urls: [],
    },
    // 网超
    mall: {
      host: `http://${domain}`,
      urls: [],
    },
    // loc: {
    //   host: 'http://10.201.36.88:8082',
    //   urls: [
    //     '/api/template/manage/templateFile/html/edit/online',
    //     'api/template/manage/templateFile/html/online',
    //   ],
    // },
    // middle
    middle: {
      host: `http://middle.${domain}`,
      useMock: [
        '/api/basicComb/detail',
        '/api/basicComb/timeLine',
        '/api/basicComb/list',
        '/api/basicComb/typeList',
        '/api/basicComb/remind',
        '/api/basicComb/delete',
        '/api/basicComb/add',

        '/api/basicDetail/detail',
        '/api/basicDetail/timeLine',

        '/api/basicList/list',
        '/api/basicList/remind',
        '/api/basicList/delete',
        '/api/basicList/add',

        '/api/complexComb/detail',
        '/api/complexComb/timeLine',
        '/api/complexComb/list',
        '/api/complexComb/typeList',
        '/api/complexComb/remind',
        '/api/complexComb/delete',
        '/api/complexComb/add',
        '/api/complexComb/district',

        '/api/complexList/list',
        '/api/complexList/remind',
        '/api/complexList/typeList',
        '/api/complexList/delete',
        '/api/complexList/add',
        '/api/complexList/district',
      ],
      urls: [
        '/api/*',
        '/user/*',
        '/district/*',
        '/api/zoss/*',
        '/api/member/*',
        '/api/article/*',
        '/api/apps/getAppsBasicInfo',
        '/api/district/getMyDistrict',
        '/api/users/getUserIdentity',
        '/api/apps/getAppsByDimForFront',
        '/api/privileges/getAppMenuTree',
        '/api/district/getDistrictTree',
        '/api/address/:pid/children',
        '/api/privileges/getEnvHref',
        '/api/district/getSubDistrictByPid',
        '/backlog/item/obtainBacklogHeadInfo',
      ],
    },
    // Rap Mock平台,无需token认证,修改本文件需要重启应用
    rap: {
      host: 'http://rap.cai-inc.com/mockjs/87', // 项目ID
      urls: [
        '/api/district/getDistrictTree',
        '/api/address/:pid/children',

        // '/api/template/manage/templateFile/online'
      ],
    },
    pageoffice: {
      host: 'http://pageoffice.dev-porsche.cai-inc.com',
      urls: [
        '/pageoffice/*',
        '/poserver.zz',
        '/create-doc.html',
      ],
    },
    // 专家库
    experts: {
      host: `http://experts.${domain}`,
      urls: ['/zcy/experts/*'],
    },
    // 代理机构
    agency: {
      host: `http://agency.${domain}`,
      urls: [],
    },
    // 供应商
    supplier: {
      host: `http://supplier.${domain}`,
      urls: [],
    },
    // 定点服务
    fixed: {
      host: `http://fixed.${domain}`,
      urls: [],
    },
    // 招投标
    bidding: {
      host: `http://bidding.${domain}`,
      urls: [],
    },
    // 车辆控购
    vehicle: {
      host: `http://vehicle.${domain}`,
      urls: [],
    },
    // 反向竞价
    reverse: {
      host: `http://reverse.${domain}`,
      urls: [],
    },
    // 在线询价，协议供货
    inquiry: {
      host: `http://inquiry.${domain}`,
      urls: [],
    },
    // 合同
    contract: {
      host: `http://contract.${domain}`,
      urls: [],
    },
  },
  user: {
    account: 'admin', // 运营
    password: 'test123456',
    // account: 'binjiangcgzx', // 滨江采购中心
    // password: 'test123456',
  },
};
