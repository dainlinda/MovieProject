# coding: utf-8
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()



class BalanceGameOption(db.Model):
    __tablename__ = 'balance_game_options'

    id = db.Column(db.Integer, primary_key=True)
    options = db.Column(db.Text)
    image = db.Column(db.String(200))



class BalanceGameResponse(db.Model):
    __tablename__ = 'balance_game_responses'

    id = db.Column(db.Integer, primary_key=True)
    left = db.Column(db.Integer)
    right = db.Column(db.Integer)
    balance_game_options_id = db.Column(db.ForeignKey('balance_game_options.id'), nullable=False, unique=True)

    balance_game_options = db.relationship('BalanceGameOption', primaryjoin='BalanceGameResponse.balance_game_options_id == BalanceGameOption.id', backref='balance_game_responses')



class Character(db.Model):
    __tablename__ = 'characters'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    house = db.Column(db.String(100))
    loyalty = db.Column(db.String(200))
    blood_status = db.Column(db.String(100))
    image = db.Column(db.String(200))

    speechs = db.relationship('Speech', secondary='speech_has_characters', backref='characters')
    spellss = db.relationship('Spell', secondary='spells_has_characters', backref='characters')



class DeathEater(db.Model):
    __tablename__ = 'death_eaters'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text)
    options = db.Column(db.JSON)



class Emotion(db.Model):
    __tablename__ = 'emotions'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    anger = db.Column(db.Integer)
    fear = db.Column(db.Integer)
    anticipation = db.Column(db.Integer)
    trust = db.Column(db.Integer)
    surprise = db.Column(db.Integer)
    sadness = db.Column(db.Integer)
    joy = db.Column(db.Integer)
    disgust = db.Column(db.Integer)
    characters_id = db.Column(db.ForeignKey('characters.id'), primary_key=True, nullable=False, index=True)

    characters = db.relationship('Character', primaryjoin='Emotion.characters_id == Character.id', backref='emotions')



class RandomDatum(db.Model):
    __tablename__ = 'random_data'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(60))
    element = db.Column(db.String(200))



class RandomDataFormat(db.Model):
    __tablename__ = 'random_data_format'

    id = db.Column(db.Integer, primary_key=True)
    format = db.Column(db.Text)



class Speech(db.Model):
    __tablename__ = 'speech'

    id = db.Column(db.Integer, primary_key=True)
    speech = db.Column(db.Text)



t_speech_has_characters = db.Table(
    'speech_has_characters',
    db.Column('speech_id', db.ForeignKey('speech.id'), primary_key=True, nullable=False, index=True),
    db.Column('characters_id', db.ForeignKey('characters.id'), primary_key=True, nullable=False, index=True)
)



class Spell(db.Model):
    __tablename__ = 'spells'

    id = db.Column(db.Integer, primary_key=True)
    spell = db.Column(db.String(200))
    series = db.Column(db.SmallInteger)



t_spells_has_characters = db.Table(
    'spells_has_characters',
    db.Column('spells_id', db.ForeignKey('spells.id'), primary_key=True, nullable=False, index=True),
    db.Column('characters_id', db.ForeignKey('characters.id'), primary_key=True, nullable=False, index=True)
)
