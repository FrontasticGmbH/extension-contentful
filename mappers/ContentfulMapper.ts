import { EntryCollection, Entry, AssetCollection, Asset, LocaleCollection } from 'contentful';

export class ContentfulMapper {
  static contentfulEntriesToFrontasticEntries(entries: EntryCollection<unknown>) {
    return entries;
  }

  static contentfulEntryToFrontasticEntry(entry: Entry<unknown>) {
    return entry;
  }

  static contentfulAssetsToFrontasticAssets(assets: AssetCollection) {
    return assets;
  }

  static contentfulAssetToFrontasticAsset(asset: Asset) {
    return asset;
  }

  static contentfulLocalesToFrontasticLocales(locales: LocaleCollection) {
    return locales;
  }
}