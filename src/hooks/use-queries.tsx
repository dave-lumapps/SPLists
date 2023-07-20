import { useState, useEffect, useCallback } from 'react';
import '../style/App.css';
import axios from 'axios';
import React from 'react';
import defaultGlobalSettings from '../widget/defaultGlobalSettings';
import  baseUrl from '../widget/defaultGlobalSettings';
import { Lumapps, useCurrentUser, useContext, useRequest, useOrganization } from 'lumapps-sdk-js';
import {
    Chip,
    ChipGroup,
    ImageBlock,
    ImageBlockCaptionPosition,
    Notification,
    Kind,
    Size,
    Theme,
    AspectRatio,
    PostBlock,
    UserBlock,
    List,
    ListItem,
    Avatar,
    Button,
    ListSubheader, 
    Table,
    TableBody,
    TableCell,
    TableCellVariant,
    TableHeader,
    TableHeaderProps,
    TableRow,
    ThOrder,
    Thumbnail,
    ThumbnailVariant,
    FlexBox,
    IconButton,
    Emphasis,
    Link,
    Orientation,
    Alignment,
    Typography,
    Color
   
    
    
} from '@lumx/react';
import { mdiCommentOutline, mdiDotsVertical, mdiInformationOutline, mdiHeart, mdiMessageTextOutline } from '@lumx/icons';
import orderBy from 'lodash/orderBy';



