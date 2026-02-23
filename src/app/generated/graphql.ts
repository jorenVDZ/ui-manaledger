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

/** Input for adding a card to collection */
export type AddCollectionItemInput = {
  /** Number of copies */
  amount: Scalars['Int']['input'];
  /** Whether this came from a booster pack */
  fromBooster?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether the card is foil */
  isFoil: Scalars['Boolean']['input'];
  /** Price paid for this item */
  pricePaid?: InputMaybe<Scalars['Float']['input']>;
  /** Scryfall ID of the card */
  scryfallId: Scalars['String']['input'];
};

/** Scryfall card - represents a Magic: The Gathering card */
export type Card = {
  __typename?: 'Card';
  /** Artist */
  artist?: Maybe<Scalars['String']['output']>;
  /** Card faces (for multi-faced cards) */
  cardFaces?: Maybe<Array<CardFace>>;
  /** Cardmarket ID */
  cardmarketId?: Maybe<Scalars['Int']['output']>;
  /** Price data from CardMarket (if available) */
  cardmarketPrice?: Maybe<CardmarketPrice>;
  /** Converted mana cost / Mana value */
  cmc: Scalars['Float']['output'];
  /** Collector number */
  collectorNumber: Scalars['String']['output'];
  /** Color identity */
  colorIdentity?: Maybe<Array<Scalars['String']['output']>>;
  /** Card colors */
  colors?: Maybe<Array<Scalars['String']['output']>>;
  /** EDH rank */
  edhrecRank?: Maybe<Scalars['Int']['output']>;
  /** Flavor text */
  flavorText?: Maybe<Scalars['String']['output']>;
  /** Whether this card is a game changer */
  gameChanger?: Maybe<Scalars['Boolean']['output']>;
  /** Games this card is available in */
  games?: Maybe<Array<Scalars['String']['output']>>;
  /** Scryfall UUID for this card */
  id: Scalars['ID']['output'];
  /** Image URIs */
  imageUris?: Maybe<ImageUris>;
  /** Whether the card is legal in Commander format */
  isCommanderLegal: Scalars['Boolean']['output'];
  /** Keywords */
  keywords?: Maybe<Array<Scalars['String']['output']>>;
  /** Language code */
  lang: Scalars['String']['output'];
  /** Legalities in various formats */
  legalities?: Maybe<Legalities>;
  /** Loyalty (for planeswalkers) */
  loyalty?: Maybe<Scalars['String']['output']>;
  /** Mana cost */
  manaCost?: Maybe<Scalars['String']['output']>;
  /** Card name */
  name: Scalars['String']['output'];
  /** Oracle ID - shared across all prints of the same card */
  oracleId?: Maybe<Scalars['String']['output']>;
  /** Oracle text */
  oracleText?: Maybe<Scalars['String']['output']>;
  /** Penny rank */
  pennyRank?: Maybe<Scalars['Int']['output']>;
  /** Power (for creatures) */
  power?: Maybe<Scalars['String']['output']>;
  /** Card rarity */
  rarity: Scalars['String']['output'];
  /** Release date */
  releasedAt?: Maybe<Scalars['String']['output']>;
  /** Scryfall API URI */
  scryfallUri?: Maybe<Scalars['String']['output']>;
  /** Set code */
  set: Scalars['String']['output'];
  /** Set name */
  setName: Scalars['String']['output'];
  /** Set type */
  setType?: Maybe<Scalars['String']['output']>;
  /** Toughness (for creatures) */
  toughness?: Maybe<Scalars['String']['output']>;
  /** Type line */
  typeLine: Scalars['String']['output'];
};

/** Card face for multi-faced cards */
export type CardFace = {
  __typename?: 'CardFace';
  artist?: Maybe<Scalars['String']['output']>;
  colors?: Maybe<Array<Scalars['String']['output']>>;
  flavorText?: Maybe<Scalars['String']['output']>;
  imageUris?: Maybe<ImageUris>;
  loyalty?: Maybe<Scalars['String']['output']>;
  manaCost?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  oracleText?: Maybe<Scalars['String']['output']>;
  power?: Maybe<Scalars['String']['output']>;
  toughness?: Maybe<Scalars['String']['output']>;
  typeLine?: Maybe<Scalars['String']['output']>;
};

/** CardMarket price data */
export type CardmarketPrice = {
  __typename?: 'CardmarketPrice';
  /** Average price */
  avg?: Maybe<Scalars['Float']['output']>;
  /** 1-day average price */
  avg1?: Maybe<Scalars['Float']['output']>;
  /** 1-day average foil price */
  avg1Foil?: Maybe<Scalars['Float']['output']>;
  /** 7-day average price */
  avg7?: Maybe<Scalars['Float']['output']>;
  /** 7-day average foil price */
  avg7Foil?: Maybe<Scalars['Float']['output']>;
  /** 30-day average price */
  avg30?: Maybe<Scalars['Float']['output']>;
  /** 30-day average foil price */
  avg30Foil?: Maybe<Scalars['Float']['output']>;
  /** Average foil price */
  avgFoil?: Maybe<Scalars['Float']['output']>;
  /** Low price */
  low?: Maybe<Scalars['Float']['output']>;
  /** Low foil price */
  lowFoil?: Maybe<Scalars['Float']['output']>;
  /** Trend price */
  trend?: Maybe<Scalars['Float']['output']>;
  /** Trend foil price */
  trendFoil?: Maybe<Scalars['Float']['output']>;
};

/** Paginated cards response */
export type CardsConnection = {
  __typename?: 'CardsConnection';
  cards: Array<Card>;
  hasMore: Scalars['Boolean']['output'];
  total: Scalars['Int']['output'];
};

/** Paginated collection items response */
export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  hasMore: Scalars['Boolean']['output'];
  items: Array<CollectionItem>;
  total: Scalars['Int']['output'];
};

/** Collection item - represents a card in a user's collection */
export type CollectionItem = {
  __typename?: 'CollectionItem';
  /** Number of copies owned */
  amount: Scalars['Int']['output'];
  /** Card data (populated from card itself) */
  card?: Maybe<Card>;
  /** Timestamp when item was added */
  createdAt: Scalars['String']['output'];
  /** Whether this came from a booster pack */
  fromBooster?: Maybe<Scalars['Boolean']['output']>;
  /** Database ID */
  id: Scalars['Int']['output'];
  /** Whether the card is foil */
  isFoil: Scalars['Boolean']['output'];
  /** Price paid for this item */
  pricePaid?: Maybe<Scalars['Float']['output']>;
  /** Scryfall ID of the card */
  scryfallId: Scalars['String']['output'];
  /** Timestamp when item was last updated */
  updatedAt: Scalars['String']['output'];
  /** User ID who owns this item */
  userId: Scalars['String']['output'];
};

/** Collection statistics */
export type CollectionStats = {
  __typename?: 'CollectionStats';
  /** Number of cards from boosters */
  boosterCount: Scalars['Int']['output'];
  /** Number of foil items */
  foilCount: Scalars['Int']['output'];
  /** Total number of individual cards (sum of amounts) */
  totalCards: Scalars['Int']['output'];
  /** Total number of unique entries */
  totalItems: Scalars['Int']['output'];
  /** Total value of collection */
  totalValue: Scalars['Float']['output'];
  /** Number of unique cards */
  uniqueCards: Scalars['Int']['output'];
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

/** Card legality for a specific format */
export type Legalities = {
  __typename?: 'Legalities';
  alchemy?: Maybe<Scalars['String']['output']>;
  brawl?: Maybe<Scalars['String']['output']>;
  commander?: Maybe<Scalars['String']['output']>;
  duel?: Maybe<Scalars['String']['output']>;
  explorer?: Maybe<Scalars['String']['output']>;
  future?: Maybe<Scalars['String']['output']>;
  gladiator?: Maybe<Scalars['String']['output']>;
  historic?: Maybe<Scalars['String']['output']>;
  historicbrawl?: Maybe<Scalars['String']['output']>;
  legacy?: Maybe<Scalars['String']['output']>;
  modern?: Maybe<Scalars['String']['output']>;
  oathbreaker?: Maybe<Scalars['String']['output']>;
  oldschool?: Maybe<Scalars['String']['output']>;
  pauper?: Maybe<Scalars['String']['output']>;
  paupercommander?: Maybe<Scalars['String']['output']>;
  penny?: Maybe<Scalars['String']['output']>;
  pioneer?: Maybe<Scalars['String']['output']>;
  predh?: Maybe<Scalars['String']['output']>;
  premodern?: Maybe<Scalars['String']['output']>;
  standard?: Maybe<Scalars['String']['output']>;
  vintage?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Add a card to the collection
   * Requires authentication
   */
  addCollectionItem: CollectionItem;
  /**
   * Delete a collection item
   * Requires authentication
   */
  deleteCollectionItem: Scalars['Boolean']['output'];
  /**
   * Update a collection item
   * Requires authentication
   */
  updateCollectionItem: CollectionItem;
};

export type MutationAddCollectionItemArgs = {
  input: AddCollectionItemInput;
};

export type MutationDeleteCollectionItemArgs = {
  id: Scalars['Int']['input'];
};

export type MutationUpdateCollectionItemArgs = {
  id: Scalars['Int']['input'];
  input: UpdateCollectionItemInput;
};

export type Query = {
  __typename?: 'Query';
  /**
   * Get card details by Scryfall ID
   * Returns the complete Scryfall card object
   * Requires authentication
   */
  card: Card;
  /**
   * Get all cards with pagination
   * Requires authentication
   */
  cards: CardsConnection;
  /**
   * Get all collection items for a specific card
   * Requires authentication
   */
  collectionItemsByCard: Array<CollectionItem>;
  /**
   * Get collection items by card name (fuzzy matching)
   * Requires authentication
   */
  collectionItemsByName: Array<CollectionItem>;
  /**
   * Get collection statistics
   * Requires authentication
   */
  collectionStats: CollectionStats;
  /**
   * Get user's collection with pagination
   * Requires authentication
   */
  myCollection: CollectionConnection;
  /**
   * Search cards by name (fuzzy matching)
   * Requires authentication
   */
  searchCards: CardsConnection;
};

export type QueryCardArgs = {
  scryfallId: Scalars['ID']['input'];
};

export type QueryCardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryCollectionItemsByCardArgs = {
  scryfallId: Scalars['String']['input'];
};

export type QueryCollectionItemsByNameArgs = {
  name: Scalars['String']['input'];
};

export type QueryMyCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QuerySearchCardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

/** Card ruling from Scryfall */
export type Ruling = {
  __typename?: 'Ruling';
  comment: Scalars['String']['output'];
  publishedAt: Scalars['String']['output'];
  source: Scalars['String']['output'];
};

/** Input for updating a collection item */
export type UpdateCollectionItemInput = {
  /** Number of copies */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** Whether this came from a booster pack */
  fromBooster?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether the card is foil */
  isFoil?: InputMaybe<Scalars['Boolean']['input']>;
  /** Price paid for this item */
  pricePaid?: InputMaybe<Scalars['Float']['input']>;
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
      cmc: number;
      artist?: string | null;
      isCommanderLegal: boolean;
      imageUris?: {
        __typename?: 'ImageUris';
        small?: string | null;
        normal?: string | null;
        large?: string | null;
      } | null;
      cardFaces?: Array<{
        __typename?: 'CardFace';
        name: string;
        imageUris?: {
          __typename?: 'ImageUris';
          small?: string | null;
          normal?: string | null;
          large?: string | null;
        } | null;
      }> | null;
      cardmarketPrice?: {
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
        cardFaces {
          name
          imageUris {
            small
            normal
            large
          }
        }
        cmc
        artist
        isCommanderLegal
        cardmarketPrice {
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
