import { Entry, Asset as ContentfulAsset, RichTextContent, ContentType } from 'contentful';
import { Attributes, Content } from '@Types/content/Content';
import { Attribute } from '@Types/content/Attribute';
import { Asset } from '@Types/content/Asset';

export class ContentfulMapper {
  static contentfulEntryToContent(contentfulEntry: Entry<unknown>, contentfulContentType: ContentType): Content {
    const attributes = this.convertToAttributes(contentfulEntry.fields);

    const content: Content = {
      contentId: contentfulEntry.sys.id,
      contentTypeId: contentfulEntry.sys.contentType.sys.id,
    };

    if (
      attributes.hasOwnProperty(contentfulContentType.displayField) &&
      typeof attributes[contentfulContentType.displayField].content === 'string'
    ) {
      content.name = attributes[contentfulContentType.displayField].content as string;
    }

    // TODO: asses if we need this field for all content or can be consider an attribute
    const slugAttributeName = 'slug';
    if (attributes.hasOwnProperty(slugAttributeName) && typeof attributes[slugAttributeName].content === 'string') {
      content.slug = attributes[slugAttributeName].content as string;
    }

    content.attributes = attributes;

    return content;
  }

  static convertToAttributes(fields: unknown): Attributes {
    const attributes: Attributes = {};

    for (const [key, value] of Object.entries(fields)) {
      const attribute: Attribute = {
        attributeId: key,
        // TODO: implement a method that can parse non string fields
        content: typeof value === 'string' ? value : this.contentfulNonHomogeneousAttributeToFrontasticAttribute(value),
      };

      attributes[key] = attribute;
    }

    return attributes;
  }

  // TODO: refactor method to parse attributes
  static contentfulNonHomogeneousAttributeToFrontasticAttribute(value: unknown) {
    if ((value as RichTextContent).nodeType && (value as RichTextContent).content) return value;
    if ((value as ContentfulAsset).sys?.type === 'Asset') return this.contentfulAsseToAsset(value as ContentfulAsset);
  }

  static contentfulAsseToAsset(contentfulAsset: ContentfulAsset): Asset {
    return {
      url: contentfulAsset.fields.file.url,
      title: contentfulAsset.fields.title,
      description: contentfulAsset.fields.description,
    };
  }
}
