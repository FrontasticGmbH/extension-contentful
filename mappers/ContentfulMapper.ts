import {
  EntryCollection,
  Entry,
  AssetCollection,
  Asset,
  LocaleCollection,
  TagCollection,
  Tag,
  RichTextContent,
} from 'contentful';
import { Content } from '@Types/content/Content';
import { Collection } from '@Types/content/Collection';
import { Locale as FrontasticContentLocale } from '@Types/content/Locale';

export class ContentfulMapper {
  static contentfulEntriesToFrontasticEntries(entries: EntryCollection<unknown>): Collection<Content> {
    return {
      total: entries.total,
      skip: entries.skip,
      limit: entries.limit,
      items: entries.items.map((item) => this.contentfulEntryToFrontasticEntry(item)),
    };
  }

  static contentfulEntryToFrontasticEntry(entry: Entry<unknown>): Content {
    return {
      contentId: entry.sys.id,
      contentTypeId: entry.sys.contentType.sys.id,
      name: entry.sys.type,
      slug: entry.sys.type.toLowerCase(),
      attributes: this.contentfulEntryAttributesToFrontasticEntryAttributes(entry.fields),
    };
  }

  static contentfulEntryAttributesToFrontasticEntryAttributes(fields: unknown) {
    return Object.fromEntries(
      Object.entries(fields).map(([key, val]) => [
        key,
        typeof val === 'string' ? val : this.contentfulNonHomogeneousAttributeToFrontasticAttribute(val),
      ]),
    );
  }

  static contentfulNonHomogeneousAttributeToFrontasticAttribute(val: unknown) {
    if ((val as RichTextContent).nodeType && (val as RichTextContent).content) return val; //Rich text content
    if ((val as Asset).sys.type === 'Asset')
      return this.contentfulAssetAttributesToFrontasticAssetAttributes((val as Asset).fields); //Asset
  }

  static contentfulAssetsToFrontasticAssets(assets: AssetCollection): Collection<Content> {
    return {
      total: assets.total,
      skip: assets.skip,
      limit: assets.limit,
      items: assets.items.map((asset) => this.contentfulAssetToFrontasticAsset(asset)),
    };
  }

  static contentfulAssetToFrontasticAsset(asset: Asset): Content {
    return {
      contentId: asset.sys.id,
      contentTypeId: 'asset',
      name: asset.sys.type,
      slug: asset.sys.type.toLowerCase(),
      attributes: this.contentfulAssetAttributesToFrontasticAssetAttributes(asset.fields),
    };
  }

  static contentfulAssetAttributesToFrontasticAssetAttributes(fields: Asset['fields']) {
    return {
      url: fields.file.url,
      width: fields.file.details.image.width,
      height: fields.file.details.image.height,
    };
  }

  static contentfulLocalesToFrontasticLocales(locales: LocaleCollection): Collection<FrontasticContentLocale> {
    return {
      total: locales.total,
      skip: locales.skip,
      limit: locales.limit,
      items: locales.items.map((locale) => ({
        id: locale.sys.id,
        code: locale.code,
        name: locale.name,
        default: locale.default,
        fallbackCode: locale.fallbackCode,
      })),
    };
  }

  static contentfulTagsToFrontasticTags(tags: TagCollection): Collection<Content> {
    return {
      total: tags.total,
      skip: tags.skip,
      limit: tags.limit,
      items: tags.items.map((tag) => this.contentfulTagToFrontasticTag(tag)),
    };
  }

  static contentfulTagToFrontasticTag(tag: Tag): Content {
    return {
      contentId: tag.sys.id,
      contentTypeId: 'tag',
      name: tag.sys.type,
      slug: tag.sys.type.toLowerCase(),
      attributes: {},
    };
  }
}
