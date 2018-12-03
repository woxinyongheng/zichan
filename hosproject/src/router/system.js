import ClassifyManage from '@/components/system/ClassifyManage';
import CodeManage from '@/components/system/CodeManage';
import TemplateSet from '@/components/system/TemplateSet';
import BrandLook from '@/components/system/BrandLook';

export default [
  {name:'ClassifyManage',path:'/classifymanage',component:ClassifyManage},
  {name:'CodeManage',path:'/codemanage',component:CodeManage},
  {name:'TemplateSet',path:'/templateset',component:TemplateSet},
  {name:'BrandLook',path:'/brandlook/:id',component:BrandLook},
]
