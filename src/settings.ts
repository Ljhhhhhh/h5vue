interface ISettings {
  title: string
  vconsole: boolean
  needPageTrans: boolean,
  layoutNeedPageTrans: boolean,
}

const settings: ISettings = {
  title: 'H5Vue',
  vconsole: false,
  needPageTrans: true,
  layoutNeedPageTrans: true
}

export default settings