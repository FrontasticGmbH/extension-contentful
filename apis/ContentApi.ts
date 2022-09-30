import { createClient, ContentfulClientApi, CreateClientParams } from 'contentful';
import { ContentfulMapper } from '../mappers/ContentfulMapper';

export default class ContentApi {
  private client: ContentfulClientApi;
  private locale: string;

  constructor(params: CreateClientParams, locale?: string) {
    this.client = createClient(params);
    this.locale = this.mapLocale(locale);
  }

  private mapLocale(locale?: string) {
    // TODO: update locales so it's not using  a hard coded value
    return { en: 'en-US' }[locale ?? ''] ?? 'en-US';
  }

  async getContent(id: string) {
    const contentfulEntry = await this.client.getEntry(id, { locale: this.locale });
    return ContentfulMapper.contentfulEntryToContent(contentfulEntry);
  }
}
