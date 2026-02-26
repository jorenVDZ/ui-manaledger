import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

/** Scryfall card - represents a Magic: The Gathering card */
export type Card = {
  __typename?: 'Card';
  artist?: Maybe<Scalars['String']['output']>;
  cardmarketId?: Maybe<Scalars['Int']['output']>;
  collectorNumber?: Maybe<Scalars['String']['output']>;
  colorIdentity?: Maybe<Array<Scalars['String']['output']>>;
  colors?: Maybe<Array<Scalars['String']['output']>>;
  edhrecRank?: Maybe<Scalars['Int']['output']>;
  edhrecUri?: Maybe<Scalars['String']['output']>;
  faces?: Maybe<Array<CardFace>>;
  finishes?: Maybe<Array<Scalars['String']['output']>>;
  flavorText?: Maybe<Scalars['String']['output']>;
  games?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  imageUris?: Maybe<ImageUris>;
  isLegalInCommander?: Maybe<Scalars['Boolean']['output']>;
  keywords?: Maybe<Array<Scalars['String']['output']>>;
  lang: Scalars['String']['output'];
  layout?: Maybe<Scalars['String']['output']>;
  manaCost?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  oracleText?: Maybe<Scalars['String']['output']>;
  power?: Maybe<Scalars['String']['output']>;
  price?: Maybe<CardmarketPrice>;
  producedMana?: Maybe<Array<Scalars['String']['output']>>;
  rarity: Scalars['String']['output'];
  releasedAt?: Maybe<Scalars['String']['output']>;
  scryfallUri?: Maybe<Scalars['String']['output']>;
  set: CardSet;
  toughness?: Maybe<Scalars['String']['output']>;
  typeLine: Scalars['String']['output'];
};

/** Card face for multi-faced cards */
export type CardFace = {
  __typename?: 'CardFace';
  colors?: Maybe<Array<Scalars['String']['output']>>;
  imageUris?: Maybe<ImageUris>;
  manaCost?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  oracleText?: Maybe<Scalars['String']['output']>;
  power?: Maybe<Scalars['String']['output']>;
  toughness?: Maybe<Scalars['String']['output']>;
  typeLine?: Maybe<Scalars['String']['output']>;
};

/** Card set details */
export type CardSet = {
  __typename?: 'CardSet';
  code: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

/** CardMarket price data */
export type CardmarketPrice = {
  __typename?: 'CardmarketPrice';
  avg?: Maybe<Scalars['Float']['output']>;
  avg1?: Maybe<Scalars['Float']['output']>;
  avg1Foil?: Maybe<Scalars['Float']['output']>;
  avg7?: Maybe<Scalars['Float']['output']>;
  avg7Foil?: Maybe<Scalars['Float']['output']>;
  avg30?: Maybe<Scalars['Float']['output']>;
  avg30Foil?: Maybe<Scalars['Float']['output']>;
  avgFoil?: Maybe<Scalars['Float']['output']>;
  idCategory?: Maybe<Scalars['Int']['output']>;
  idProduct?: Maybe<Scalars['Int']['output']>;
  low?: Maybe<Scalars['Float']['output']>;
  lowFoil?: Maybe<Scalars['Float']['output']>;
  trend?: Maybe<Scalars['Float']['output']>;
  trendFoil?: Maybe<Scalars['Float']['output']>;
};

/** Paginated cards response */
export type CardsConnection = {
  __typename?: 'CardsConnection';
  cards: Array<Card>;
  hasMore: Scalars['Boolean']['output'];
  total: Scalars['Int']['output'];
};

/** Scryfall card image URIs */
export type ImageUris = {
  __typename?: 'ImageUris';
  artCrop?: Maybe<Scalars['String']['output']>;
  borderCrop?: Maybe<Scalars['String']['output']>;
  large?: Maybe<Scalars['String']['output']>;
  normal?: Maybe<Scalars['String']['output']>;
  png?: Maybe<Scalars['String']['output']>;
  small?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  card: Card;
  searchCards: CardsConnection;
};

export type QueryCardArgs = {
  scryfallId: Scalars['ID']['input'];
};

export type QuerySearchCardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type SearchCardsQueryVariables = Exact<{
  query: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;

export type SearchCardsQuery = {
  __typename?: 'Query';
  searchCards: {
    __typename?: 'CardsConnection';
    total: number;
    hasMore: boolean;
    cards: Array<{
      __typename?: 'Card';
      id: string;
      name: string;
      imageUris?: {
        __typename?: 'ImageUris';
        small?: string | null;
        normal?: string | null;
        large?: string | null;
      } | null;
      faces?: Array<{
        __typename?: 'CardFace';
        name: string;
        imageUris?: {
          __typename?: 'ImageUris';
          small?: string | null;
          normal?: string | null;
          large?: string | null;
        } | null;
      }> | null;
      price?: {
        __typename?: 'CardmarketPrice';
        avg?: number | null;
        low?: number | null;
        avg1?: number | null;
        avg7?: number | null;
        avg30?: number | null;
        trend?: number | null;
        avgFoil?: number | null;
        lowFoil?: number | null;
        avg1Foil?: number | null;
        avg7Foil?: number | null;
        avg30Foil?: number | null;
        trendFoil?: number | null;
        idProduct?: number | null;
        idCategory?: number | null;
      } | null;
    }>;
  };
};

export const SearchCardsDocument = gql`
  query searchCards($query: String!, $limit: Int, $offset: Int) {
    searchCards(query: $query, limit: $limit, offset: $offset) {
      cards {
        id
        name
        imageUris {
          small
          normal
          large
        }
        faces {
          name
          imageUris {
            small
            normal
            large
          }
        }
        price {
          avg
          low
          avg1
          avg7
          avg30
          trend
          avgFoil
          lowFoil
          avg1Foil
          avg7Foil
          avg30Foil
          trendFoil
          idProduct
          idCategory
        }
      }
      total
      hasMore
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class SearchCardsGQL extends Apollo.Query<SearchCardsQuery, SearchCardsQueryVariables> {
  override document = SearchCardsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
