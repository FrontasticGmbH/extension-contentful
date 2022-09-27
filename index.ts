import { DataSourceConfiguration, DataSourceContext, ExtensionRegistry } from '@frontastic/extension-types';
import ContentfulApi from './apis/BaseApi';
import * as ContentfulActions from './actionControllers/ContenfulController';
import { getLocale } from './utils/Request';

export default {
  'data-sources': {
    'frontastic/content-list': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      const clientConfig = context.frontasticContext?.project.configuration.contentful;

      const contentfulApi = new ContentfulApi(
        { space: clientConfig.spaceId, accessToken: clientConfig.accessToken },
        getLocale(context.request),
      );

      return {
        dataSourcePayload: await contentfulApi.getEntries(),
      };
    },
    'frontastic/content': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      const clientConfig = context.frontasticContext?.project.configuration.contentful;

      const contentfulApi = new ContentfulApi(
        { space: clientConfig.spaceId, accessToken: clientConfig.accessToken },
        getLocale(context.request),
      );

      return {
        dataSourcePayload: await contentfulApi.getEntry(config.configuration.entryId),
      };
    },
    'frontastic/asset-list': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      const clientConfig = context.frontasticContext?.project.configuration.contentful;

      const contentfulApi = new ContentfulApi(
        { space: clientConfig.spaceId, accessToken: clientConfig.accessToken },
        getLocale(context.request),
      );

      return {
        dataSourcePayload: await contentfulApi.getAssets(),
      };
    },
    'frontastic/asset': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      const clientConfig = context.frontasticContext?.project.configuration.contentful;

      const contentfulApi = new ContentfulApi(
        { space: clientConfig.spaceId, accessToken: clientConfig.accessToken },
        getLocale(context.request),
      );

      return {
        dataSourcePayload: await contentfulApi.getAsset(config.configuration.assetId),
      };
    },
  },
  actions: {
    contentful: ContentfulActions,
  },
} as ExtensionRegistry;
